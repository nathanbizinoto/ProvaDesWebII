const { createApp } = Vue;

createApp({
    data() {
        return {
            heroi: { vida: 100 },
            vilao: { vida: 100 },
            aux: 1,
            mensagemAcao: '',
            historico: []
        };
    },
    methods: {
        atacar(isHeroi) {
            const alvo = isHeroi ? this.vilao : this.heroi;
            const mensagem = isHeroi ? "Herói atacou" : "Vilão atacou";

            if (alvo.vida > 5) {
                alvo.vida -= 10;
            } else {
                alvo.vida = 0;
            }

            this.mensagemAcao = mensagem;
            this.historico.push(`${mensagem}. Vida do ${isHeroi ? 'vilão' : 'herói'}: ${alvo.vida}`);
            console.log(mensagem);

            if (isHeroi) {
                this.acaoVilao();
                this.aux = 1;
            }

            this.verificarVida();
        },
        defender(isHeroi) {
            const mensagem = isHeroi ? "Herói defendeu" : "Vilão defendeu";

            this.mensagemAcao = mensagem;
            console.log(mensagem);
            this.historico.push(mensagem + ".");

            if (isHeroi) {
                this.acaoVilao();
            } else {
                this.aux = 1;
            }

            this.verificarVida();
        },
        usarPocao(isHeroi) {
            const personagem = isHeroi ? this.heroi : this.vilao;
            const mensagem = isHeroi ? "Herói usou poção" : "Vilão usou poção";

            if (personagem.vida < 95) {
                personagem.vida += 5;
            } else {
                personagem.vida = 100;
            }

            this.mensagemAcao = mensagem;
            console.log(mensagem);
            this.historico.push(`${mensagem}. Vida do ${isHeroi ? 'herói' : 'vilão'}: ${personagem.vida}`);

            if (isHeroi) {
                this.aux = 1;
                this.acaoVilao();
            }

            this.verificarVida();
        },
        correr(heroiCorrendo) {
            const vencedor = heroiCorrendo ? "VILÃO" : "HERÓI";
            this.mensagemAcao = heroiCorrendo ? "Herói correu" : "Vilão correu";

            alert(`Fim de Jogo: ${vencedor} GANHOU`);
            console.log(this.mensagemAcao);
            this.historico.push(this.mensagemAcao + ".");
        },
        verificarVida() {
            if (this.heroi.vida <= 0) {
                alert("Fim de Jogo: VILÃO GANHOU");
                location.reload();
            } else if (this.vilao.vida <= 0) {
                alert("Fim de Jogo: HERÓI GANHOU");
                location.reload();
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
            const acoes = ['atacar', 'defender', 'usarPocao', 'correr'];
            const pesos = [5, 2, 2, 1]; // probabilidades ajustadas
            const acaoAleatoria = this.pesosAleatorios(acoes, pesos);

            this[acaoAleatoria](false);
        },
        pesosAleatorios(opcoes, pesos) {
            let somaPesos = pesos.reduce((a, b) => a + b, 0);
            let acumulado = 0, r = Math.random() * somaPesos;

            for (let i = 0; i < opcoes.length; i++) {
                acumulado += pesos[i];
                if (r <= acumulado) return opcoes[i];
            }
        }
    }
}).mount("#app");
