/* importar as configurações do servidor */
var app = require('./config/server');

/* parametrizar porta de escuta */
/* no caso do chat precisamos colocar o listen em uma variavel para passar para o soket.io para saber em que porta ele vai responder*/
var server = app.listen(80, function(){
    console.log('Servidor online');
});

var io = require('socket.io').listen(server);

/* Deixanddo o socket.io uma variavel global */
app.set('io',io);

/* Criar a conexao websocket */
io.on('connection', function(socket){
    console.log("Usuario conectou no o socket io");

    /* .on = fica ouvindo pedidos de execucao */
    socket.on('disconnect',function(){
        console.log("Usuario desconectou do socket io");
    });

    /*Assim que a mensagem chega, ele ja manda de volta para todos que estão 'logados'   - obs.: nao persiste dados */
    socket.on('msgParaServidor', function(data){
        /* o Emit faz o emit da msg apenas para quem fez a chamda da função, ja quando se usa o broadcast a msg vai para todos conectados no socket*/
        socket.emit('msgParaCliente', data);
        socket.broadcast.emit('msgParaCliente', data);

        if(parseInt(data.apelido_atualizado_nos_clientes) == 0){
            socket.emit('participantesParaCliente', {apelido: data.apelido});
            socket.broadcast.emit('participantesParaCliente',{apelido: data.apelido});
        }
    });
    /* .emmit = faz o pedido para execultar alguma acao */
});