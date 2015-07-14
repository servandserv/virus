/* Models */
var virion = {
    x: null,
    y: null,
    state: "dead",
    born: function() 
    {
        this.state = "alive";
    },
    alive: function() 
    {
        this.state = "alive";
    },
    die: function() 
    {
        this.state = "dead";
    },
    /**
     * calculate virion live friends
     */
    friends: function(virions) 
    {
        var minx = Math.max(0,this.x-1);
        var miny = Math.max(0,this.y-1);
        var maxx = Math.min(virions.x,this.x+2);
        var maxy = Math.min(virions.y,this.y+2)
        return 1;
    },
    draw: function() 
    {
        if(this.state == 'dead') {
            view.write("-");
        } else {
          view.write("O");
        }
    }
}

var virus = {
    x: null,
    y: null,
    virions: [],
    init: function( y, x ) 
    {
        x = x;
        y = y;
        var v;
        for(var i=0;i<x;i++) {
            var col = [];
            for(var a=0;a<y;a++) {
                v = Object.create( virion );
                col.push(v);
            }
            this.virions.push(col);
        }
    },
    animate: function( vs ) 
    {
        for(var o=0;o<vs.length;o++) {
            this.virions[vs[o][0]][vs[o][1]].born();
        }
    },
    infect: function() 
    {
        var friends, col, v;
        var next = [];
        for(var i=0;i<this.virions.length;i++) {
            col = [];
            for(var a=0;a<this.virions[i].length;a++) {
                friends = this.virions[i][a].friends(this.virions);
                v = Object.create( virion );
                if( friends === 2 && this.virions[i][a].state === 'alive') {
                    v.alive();
                } else if( friends === 3 ) {
                    v.born();
                }
                col.push(v);
            }
            next.push(col);
        }
        this.virions = next;
        this.draw();
    },
    draw: function() 
    {
        view.clear();
        for(var i=0;i<this.virions.length;i++) {
            for(var a=0;a<this.virions[i].length;a++) {
                this.virions[i][a].draw();
            }
            view.write("<br/>");
        }
    }
}