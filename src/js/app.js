// Ethereum MiddleWare init
etherApp = {
    web3Provider: null,
    contracts: {},

    init: async function() {
        return await App.initWeb3();
    },

    initWeb3: async function() {
        // Modern dapp browsers...
        // Using Modern dapp browsers or the more recent versions of MetaMask
        // An ethereum provider is injected into the window object.
        // If so, we use it to create our web3 object, but we also need to explicitly
        // request access to the accounts with etereum.enable()
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            try {
            // Request account access
            await window.ethereum.enable();
            } catch (error) {
            // User denied account access...
            console.error("User denied account access")
            }
        }
        // Legacy dapp browsers...
        // check for an injected web3 instance
        // older dapp browser(like Mist or an older version of MetaMask)
        // If so, we get its provider and use it to create our web3 object

        else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        }
        // If no injected web3 instance is detected, fall back to Ganache
        // create our web3 object based on our local provider
        // This fallback is fine for development enviromnets, but insecure and not suitable for production
        else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }

        web3 = new Web3(App.web3Provider);

        return App.initContract();
    },

    initContract: function() {
        // Need to instantaite our smart contract so web3 knows where to find it and how it works.
        // Truffle has a library to help with this called truffle-contract.
        // It keeps information about the contract in sync with migrations
        // so you don`t need to change the contract`s deployed address manually
        
    
        // First retrieve the artifact file for out smart contract.
        // Artifacts are information about our contract such as its deployed address and
        // Application Binary Interface(ABI). The ABI is a JavaScript object defining
        // how to interact with the contract including its variables, functions and their parameters
        $.getJSON('BabyContract.json', function(data) {

        });
    
        // 해당 부분은 기존 petshop 소스에는 jQuery 방식으로 EventHandler 생성
        return App.bindEvents();
    },
};

//express init

var express = require('express');

var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var multer = require('multer');

// multer 사용을 위한 storage 선언
var _storage = multer.diskStorage({
    // 경로 선언
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '/uploads'));
    },
    // 실제 filename 을 사용하는 경우, 암호화된 파일의 경로가 입력된다.
    // 차후 가능하다면 filter 기능을 통해 이미지파일만 입력가능하도록 선언
    // png, jpg
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  })
  
var upload = multer({ storage: _storage });

var app = express();

app.locals.pretty = true;

app.use(express.static(path.join(__dirname, '/public/')));

// static이라는 경로로 바로 접속가능하도록 설정
//app.use('/static/', express.static(path.join(__dirname, '/public/')));

app.use(bodyParser.urlencoded({ exteneded: false }));

//app.set('views', './views');
// ejs 기반으로 html 서비스
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// 등록기능을 통한 정보생성 post 기능
// 차후 form 이름 동기화
app.post('/registerInfo', upload.single('userFile'), function(req,res) {
    //console.log(req.file.filename);
    console.log(req.file);

    //etherApp.

    res.send('File upload Completed');

});

$(function() {
    $(window).load(function() {
      etherApp.init();
    });
  });