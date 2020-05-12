var Imap = require('imap');
var simpleParser = require("mailparser").simpleParser;
let Link;

const connectClient = async function(user, password, regexChoice) {
    var regex = regexChoice || null;
    var client = new Imap({
        user: user,
        password: password,
        host: 'imap.gmail.com',
        port: 993,
        tls: true
        });
    console.log('getting here')
    const clientEventListener = async function (event){
        return new Promise((resolve, reject) => {
            client.once(event, async function(){
                resolve();
            });
            client.once('error', function(err) {
                reject(err);
            });
            client.once('end', function() {
                console.log('Connection ended');
                client.end();
            });
        })
    }

    const openInbox = async function (){
        return new Promise((resolve, reject) => {
            client.openBox('INBOX', true, function(err, box){
                console.log(box, 'box');
                if(err){
                    reject(err, 'err');
                } else {
                    resolve(box);
                }
            })
        })
    }

    const fetchMessages = async function (box){
        return new Promise((resolve, reject) => {
            // get only the latest email
            var f = client.seq.fetch(box.messages.total + ':', { bodies: ['HEADER.FIELDS (FROM)','TEXT'] });
            f.on('message', function(msg, seqno) {
                msg.on('body', function(stream, info) {
                    simpleParser(stream).then((parsed) => {
                        if(regex === "IAM") {
                            var iamRegex = /(?<=If the link has expired you can initiate another password reset request<\/p><p><a href=")(.*?)(?=">)/
                            if(parsed.textAsHtml){
                                Link = parsed.textAsHtml;
                                var linkFound = Link.match(iamRegex);
                                console.log(linkFound)
                                if(linkFound){
                                    linkFound = linkFound[0];
                                    resolve(linkFound);
                                } else {
                                    resolve('www.google.com');
                                }
                            }
                        } else if (regex === "courseware"){
                            var coursewareRegex = /(?<=frontend.mldev.cloud\/courses\/)(.*?)(?=">)/
                            if(parsed.textAsHtml){
                                Link = parsed.text;
                                var linkFound = Link.match(coursewareRegex);

                                // const $ = cheerio.load(parsed.text);
                                // const href = $('a[style=3D"color: #080808;"]').text();
                                // console.log('mailObject~~~~~~~~~~~~~~~~~~',parsed.text, '~~~~~mailObject', info, '~~~~~~~~~~~href ', href, 'href~~~~~~~~~~~~~')
                                if(linkFound){
                                    linkFound = "https://int-achieve-courseware-frontend.mldev.cloud/courses/" + linkFound[0];
                                    console.log(linkFound, "~~~~~~~LinkFound!!!!!!!");
                                    resolve(linkFound);
                                } else {
                                    resolve('www.google.com');
                                }
                            }
                        } else {
                            resolve(parsed);
                        }

                    })
                });
            })
            f.once('error', function(err) {
                console.log('Fetch error: ' + err);
                reject(err, 'error~~~~~~');
                client.end();
            });
            f.once('end', function() {
                console.log('Done fetching all messages!');
                client.end();
            });
        })
    }
    // https://github.com/mscdex/node-imap/issues/359
    const sortMessages = async function (results){
        return new Promise((resolve, reject) => {
            client.search([ 'NEW' ], function(err, results) {
                if (err || !results.length){
                    client.end();
                    reject(err, 'error or results length is ', results.length, ' long');
                } else {
                    // get only the latest email
                    // var f = client.fetch(box.messages.total + ':*', { bodies: ['HEADER.FIELDS (FROM)','TEXT'] });
                    resolve(results);
                } 
            })
        })
    }
    try {
        await client.connect();

        await clientEventListener('ready');

        const box = await openInbox();

        return await fetchMessages(box);

    } catch(err) {
        console.log(err, 'err in connectClient')
    }
}

module.exports = {
    connectClient
  }