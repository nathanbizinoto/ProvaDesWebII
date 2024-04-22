const { createApp } = Vue;

createApp({
    data() {
        return {
            heroi: { vida: 100 },
            vilao: { vida: 100 },
            aux: 1,
            mensagemAcao: '',
            historico: []
        }
        
    },
    methods: {
        atacar(isHeroi) {
            if (isHeroi) {
                this.vilao.vida = this.vilao.vida > 5 ? this.vilao.vida - 10 : 0;
                this.mensagemAcao = "Herói atacou";
                this.historico.push("Herói atacou. Vida do vilão: " + this.vilao.vida); 
                console.log("Herói atacou");
                this.acaoVilao();
                this.aux = 1;
            } else {
                this.mensagemAcao = "Vilão atacou"; 
                this.historico.push("Vilão atacou. Vida do herói: " + this.heroi.vida);
                console.log("Vilão atacou");
                this.heroi.vida = this.heroi.vida > 5 ? this.heroi.vida - 10 : 0;
            }
            this.verificarVida();
        },
        defender(isHeroi) {
            if (isHeroi) {
                this.mensagemAcao = "Herói defendeu";
                console.log("Herói defendeu");
                this.acaoVilao();
                this.historico.push("Herói defendeu.");
            } else {
                this.mensagemAcao = "Vilão defendeu"; 
                console.log("Vilão defendeu");
                this.aux = 1; 
                this.historico.push("Vilão defendeu.");
            }
            this.verificarVida();
        },
        usarPocao(isHeroi) {
            if (isHeroi) {
                this.mensagemAcao = "Herói usou poção"; 
                console.log("Herói usou poção");
                this.heroi.vida = this.heroi.vida < 95 ? this.heroi.vida + 5 : 100;
                this.aux = 1;
                this.acaoVilao();
                this.historico.push("Herói usou poção. Vida do herói: " + this.heroi.vida);
            } else {
                this.mensagemAcao = "Vilão usou poção"; 
                console.log("Vilão usou poção");
                this.vilao.vida = this.vilao.vida < 95 ? this.vilao.vida + 5 : 100;
                this.historico.push("Vilão usou poção. Vida do vilão: " + this.vilao.vida);
            }
            this.verificarVida();
        },
        correr(heroiCorrendo) {
            if (heroiCorrendo) {
                this.mensagemAcao = "Herói correu"; 
                alert("Fim de Jogo: VILÃO GANHOU");
                console.log("Herói correu");
                this.historico.push("Herói correu.");
            } else {
                this.mensagemAcao = "Vilão correu"; 
                alert("Fim de Jogo: HERÓI GANHOU");
                console.log("Vilão correu");
                this.historico.push("Vilão correu.");
            } 
        },
        verificarVida() {
            if (this.heroi.vida <= 0) {
                alert("Fim de Jogo: VILÃO GANHOU");
                location.reload()
            } else if (this.vilao.vida <= 0) {
                alert("Fim de Jogo: HERÓI GANHOU");
                location.reload()
            }

        },
        vidaCor(vida) {
            if (vida <= 35) {
                return 'baixa';
            } else if (vida <= 60) {
                return 'media';
            } else {
                return 'alta';
            }
        },
        acaoVilao() {
            const acoes = ['atacar', 'atacar', 'atacar', 'atacar', 'atacar', 
            'defender', 'defender', 
            'usarPocao', 'usarPocao', 
            'correr'
            ];
            const acaoAleatoria = acoes[Math.floor(Math.random() * acoes.length)];
            this[acaoAleatoria](false);
        }
        
    }
}).mount("#app");