var vir = Object.create(virus);
vir.createVirions(50,30);
vir.animate([[5,5],[4,4],[4,5]]);
vir.draw();
vir.infect();