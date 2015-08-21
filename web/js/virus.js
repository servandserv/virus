;
(function (d, virus) {

    //This function initiates the map and tells us how big and wide it is
    virus.init = function (area, v) {

        //First we need to count the hight and width of the area of the virus
        virus.size = virus.calcVirusSize(area);
        //zero the virus virions
        virus.virions = [];
        //The current dose of the infected part of the world
        virus.infected = 0;
        //This is how many days the world survived since the breakout of the virus
        virus.age = 0;
        //Counter which saves the amount of days from the last infection
        virus.lastDeployment = 0;
        virus.interval = null;
        virus.medpacks = virus.MAXMEDPACKS;
        virus.MAXINFECTED = v.MAXINFECTED;
        virus.NEWDEPLOYMENT = v.NEWDEPLOYMENT;
        virus.virions = virus.initVirions(virus.size.x, virus.size.y);

        var evt = new CustomEvent("VirusCreated", {detail: virus});
        d.dispatchEvent(evt);
    };

    virus.calcVirusSize = function (area) {
        var x = parseInt(area.offsetWidth / 10);
        var y = parseInt(area.offsetHeight / 10);
        return {
            x: x,
            y: y,
            square: x * y
        }
    }

    virus.initVirions = function (x, y) {
        var line;
        var virions = [];
        //for each line of the table
        for (var i = 0; i < y; i++) {
            line = [];
            for (var j = 0; j < x; j++) {
                line.push(null);

            }
            virions.push(line);
        }
        return virions;
    }

    //this function select the virus test randomly
    virus.selectTest = function () {
        //this chooses a random virus from the ones made
        var testsCount = virus.tests.length;
        var test = parseInt(testsCount * Math.random());
        var virions = virus.patterns[virus.tests[test]].virions;
        return virions;
    }

    //this function is to deploy the virus and restart the game
    virus.deploy = function (v, test, x, y) {
        //then randomly puts it in a place on the map
        x = x || parseInt((v.size.x - test[0].length) * Math.random());
        y = y || parseInt((v.size.y - test.length) * Math.random());

        for (var i = 0; i < v.size.y; i++) {
            for (var j = 0; j < v.size.x; j++) {
                if (j >= x && i >= y && test[i - y] && test[i - y][j - x] === 1) {
                    v.virions[i][j] = 1;
                }
            }
        }

        var evt = new CustomEvent("VirusDeployed", {detail: v});
        d.dispatchEvent(evt);

        return v;
    };

    //this function works when we click on the virus cells
    virus.killVirion = function (x, y) {
        //if we have medpacks and the cell we click on theres a virus
        if (virus.medpacks > 0 && virus.virions[y][x] !== null) {
            //we lose one medpack
            virus.medpacks--;
            //and tell everything that the medpack got used
            var evt = new CustomEvent("MedpacksUpdated", {detail: virus});
            d.dispatchEvent(evt);
            //kill the virion
            virus.virions[y][x] = 0;
        }
    };

    //this function controlls the way the virus infects
    virus.infect = function () {
        //the new strain of the virus gets written in nextStrain variable
        var nextStrain = [];
        var line;
        var neighbours = 0;
        virus.infected = 0;

        //for each row of the table
        for (var i = 0; i < virus.size.y; i++) {
            line = [];
            //for each cell of the row
            for (var j = 0; j < virus.size.x; j++) {
                //count the amount of alive neighbours of the virion
                neighbours = countNeighbours(i, j, virus);
                //document.getElementById("id"+i+"x"+j).innerHTML = neighbours;
                if ((neighbours > 3 || neighbours < 2) && virus.virions[i][j] === 1) {
                    //if the neighbours are more than 3 or less 2 and the virion is alive it dies
                    line.push(0);
                } else if (neighbours === 3 && virus.virions[i][j] !== 1) {
                    //if there are three neighbours and the virion is dead it gets born
                    line.push(1);
                } else if (virus.virions[i][j] === 1) {
                    //if the virion is alive then leave him
                    line.push(1);
                } else if (virus.virions[i][j] === 0) {
                    //if the virion is dead then leave him dead
                    line.push(0);
                } else {
                    //in all other cases we leave the cell of the virus empty
                    line.push(null);
                }
                if (line[j] !== null)
                    virus.infected++;
            }
            nextStrain.push(line);
        }
        //find the dose infected cells from the rest of the cells
        virus.infected = virus.infected * 100 / virus.size.square;
        //we add one day to the number survived
        virus.age++;
        virus.lastDeployment++;
        virus.virions = nextStrain;
        //if from the moment of the last deployment a certain amount of time whent away
        //we deploy a new virus
        if (virus.lastDeployment === virus.NEWDEPLOYMENT) {
            virus.lastDeployment = 0;
            virus.medpacks = 10;
            var evt = new CustomEvent("MedpacksUpdated", {detail: virus});
            d.dispatchEvent(evt);
            var virions = virus.selectTest();
            virus = virus.deploy(virus, virions);
        } else {
            var evt = new CustomEvent("NextStrain", {detail: virus});
            d.dispatchEvent(evt);
        }
        //if the dose of the infected is more than the setup amount the we stop the game
        if (virus.MAXINFECTED < virus.infected && virus.interval) {
            clearInterval(virus.interval);
            var evt = new CustomEvent("GameFinished", {detail: "<div>Game Over!<br/>World survived " + virus.age + " days.<br/> More then 50% territory infected.</div>"});
            d.dispatchEvent(evt);
        }
    };

    //this function count the number of living neighbours
    function countNeighbours(i, j, v) {
        var ns = 0; // counter for alive neighbours
        var yMax = Math.min(v.size.y, i + 2);
        var yMin = Math.max(0, i - 1);
        var xMax = Math.min(v.size.x, j + 2);
        var xMin = Math.max(0, j - 1);

        //for this we count every cell that lies near our virion and check if there is a living
        // virion then add a 1 to the counter
        for (var y = yMin; y < yMax; y++) {
            for (var x = xMin; x < xMax; x++) {
                if (v.virions[y][x] === 1 && !(y == i && x == j)) {
                    ns++;
                }
                if (ns > 3) {
                    return 4;
                }
            }
        }
        return ns;
    }
    ;

    // views controllers
    virus.renderMap = function (view, virus, pref, callback) {
        var tr, td, line;
        // clean the table
        while (view.firstChild) {
            view.removeChild(view.firstChild);
        }
        //for each line of the table
        for (var i = 0; i < virus.size.y; i++) {
            //we make a tr tag and line array
            tr = d.createElement("tr");
            for (var j = 0; j < virus.size.x; j++) {
                //for each bar of the table
                td = d.createElement("td");
                td.setAttribute("id", pref + "_" + i + "x" + j);
                td.y = i;
                td.x = j;
                //we make the tag td and add it to the table
                tr.appendChild(td);
                //for each of the cell in the table we add a trigger
                //which kills one virion of the virus in the cell of the table when we click on it
                td.addEventListener("click", function (e) {
                    callback(e.target.x, e.target.y);
                })

            }
            //we add element tr into the table
            view.appendChild(tr);
        }
    };

    //this is the function that shows the running state of the virus,medpacks and infected people
    virus.renderVirus = function (view, v, pref) {
        var td;

        //for each row of the table
        for (var i = 0; i < v.size.y; i++) {
            //for each coloumn of the row
            for (var j = 0; j < v.size.x; j++) {
                if (v.virions[i][j] == 1) {
                    //if the virus in that cell is living
                    td = d.getElementById(pref + "_" + i + "x" + j);
                    //set the attribute alt = ones which are living virions
                    td.setAttribute("alt", 1);
                } else if (v.virions[i][j] == 0) {
                    //and the same for the dead virus cells
                    td = d.getElementById(pref + "_" + i + "x" + j);
                    td.setAttribute("alt", 0);
                }
            }
        }
    };

    virus.renderInfectedCounter = function (view, virus) {
        //show the amount of infected on the screen
        view.innerHTML = parseInt(virus.infected) + "%";
    };

    virus.renderSurvivedDays = function (view, virus) {
        //show on the screen how many days we've survived
        view.innerHTML = "Days: " + virus.age;
    };

    virus.renderMessage = function (view, msg) {
        view.innerHTML = msg;
        view.style.display = "flex";
        setTimeout(function () {
            view.style.display = "none";
        }, 5000);
    };

}(document, window.virus));

