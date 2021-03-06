/* We made examples of the viruses which are in objects like this:
 *       {
 *           name: "virus name",
 *           virions: [
 *               [0,0,0,0,0],
 *               [0,0,1,1,0],
 *               [0,1,1,0,0],
 *               [0,0,1,0,0],
 *               [0,0,0,0,0]
 *           ]
 *       }
 */
window.virus.ns = "virus";
window.virus.intervalValue = 50;
window.virus.patterns = [
    {
        name: "Diamond",
        virions: [
            [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
        ],
        size: {
            x: 12,
            y: 9,
            square: 108
        }
    }, {
        name: "Acorn",
        virions: [
            [0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [1, 1, 0, 0, 1, 1, 1]
        ],
        size: {
            x: 7,
            y: 3,
            square: 21
        }
    }, {
        name: "Blom",
        virions: [
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0]
        ],
        size: {
            x: 12,
            y: 5,
            square: 60
        }
    }, {
        name: "Bunnies",
        virions: [
            [1, 0, 0, 0, 0, 0, 1, 0],
            [0, 0, 1, 0, 0, 0, 1, 0],
            [0, 0, 1, 0, 0, 1, 0, 1],
            [0, 1, 0, 1, 0, 0, 0, 0]
        ],
        size: {
            x: 8,
            y: 4,
            square: 32
        }
    }, {
        name: "Century",
        virions: [
            [0, 0, 1, 1],
            [1, 1, 1, 0],
            [0, 1, 0, 0]
        ],
        size: {
            x: 4,
            y: 3,
            square: 12
        }
    }, {
        name: "Cheshire cat",
        virions: [
            [0, 1, 0, 0, 1, 0],
            [0, 1, 1, 1, 1, 0],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [0, 1, 1, 1, 1, 0]
        ],
        size: {
            x: 6,
            y: 6,
            square: 36
        }
    }, {
        name: "Crystal",
        virions: [
            [0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 1, 1],
            [1, 1, 1, 0, 0, 0, 1, 1]
        ],
        size: {
            x: 8,
            y: 3,
            square: 24
        }
    }, {
        name: "Die Hard",
        virions: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
            [0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ],
        size: {
            x: 10,
            y: 5,
            square: 50
        }
    }, {
        name: "Multum in parvo",
        virions: [
            [0, 0, 0, 1, 1, 1],
            [0, 0, 1, 0, 0, 1],
            [0, 1, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0]
        ],
        size: {
            x: 6,
            y: 4,
            square: 24
        }
    },{
        name: "Pentadecathlon",
        virions: [
            [1, 1, 1, 1, 1, 1,1,1,1,1]
        ],
        size: {
            x: 6,
            y: 4,
            square: 24
        }
    }, {
        name: "The Queen Bee shuttle",
        virions: [
            [1, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1],
            [0, 0, 0, 1],
            [0, 0, 0, 1],
            [0, 0, 1, 0],
            [1, 1, 0, 0]
        ],
        size: {
            x: 4,
            y: 7,
            square: 28
        }
    }, {
        name: "R-pentomino",
        virions: [
            [0, 0, 0, 0, 0],
            [0, 0, 1, 1, 0],
            [0, 1, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0]
        ],
        size: {
            x: 5,
            y: 6,
            square: 30
        }
    }, {
        name: "Thunderbird",
        virions: [
            [1, 1, 1],
            [0, 0, 0],
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0]
        ],
        size: {
            x: 3,
            y: 5,
            square: 15
        }
    }

];

window.virus.tests = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
];

