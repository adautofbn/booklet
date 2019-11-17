# booklet

O Booklet é um aplicativo para Android e iOS que permite a organização do seu dia a dia como professor, de forma prática, diretamente no seu celular.

## Começando

Essas instruções vão lhe ceder uma cópia do projeto funcionando localmente na sua máquina, para fins de desenvolvimento e testes. Para hospedar a aplicação em um sistema, veja o guia de hospedagem.

### Pré-requisitos

Quais ferramentas você precisa instalar para usar o software e como instalar

##### Node.JS
https://nodejs.org/en/download/

Necessária versão 10 ou superior.

Ubuntu:
```
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
```

##### Ionic Framework
Após instalação do Node.JS

```
npm install -g ionic
```

### Instalação

Um passo a passo de como configurar e instalar o ambiente para desenvolvimento

Faça clone do repositório:

```
https://github.com/adautofbn/booklet.git
```

Na pasta '/booklet' que foi criada, faça:

```
npm install
```

Agora, navegue até 'booklet/booklet' e execute o comando:

```
ionic serve
```

Isso irá iniciar o aplicativo no seu navegador padrão e você poderá utilizá-lo, igualmente a se estivesse no seu smartphone.

## Hospedagem

Para realizar a sua hospedagem da aplicação, é necessário criar um projeto no Firebase e alterar o arquivo 'environment.ts' com as variáveis de ambiente iniciadas no seu projeto Firebase.

## Construído usando

* [Ionic Framework](https://ionicframework.com/docs/intro) - Framework web para aplicativos móveis
* [NodeJS](https://nodejs.org/en/) - JavaScript Runtime
* [Firebase](https://firebase.google.com/?hl=pt-BR) - Plataforma de infraestrutura para aplicativos

## Autores

* **Adauto Barros** - *Orientando* - [Adautofbn](https://github.com/adautofbn)
* **Rohit Gheyi** - *Orientador*
