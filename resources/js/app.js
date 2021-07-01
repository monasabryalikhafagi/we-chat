/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');



// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('message', require('./components/MessageComponent.vue').default);
import axios from 'axios';
import { timers } from 'jquery';
import VueChatScroll from 'vue-chat-scroll';
import Toaster from 'v-toaster';
Vue.use(Toaster, { timeout: 5000 });

// You need a specific loader for CSS files like https://github.com/webpack/css-loader
import 'v-toaster/dist/v-toaster.css';

Vue.use(VueChatScroll);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    data: {
        message: '',
        typing: '',
        chat: {
            messages: [],
            user: [],
            color: [],
            time: []
        }
    },
    watch: {
        message() {
            Echo.private('chat')
                .whisper('typing', {
                    name: this.message
                });
        }
    },
    methods: {
        send() {
            if (this.message.length > 0) {

                this.chat.color.push("success");
                this.chat.user.push("you");
                this.chat.time.push(this.getTime());

                this.chat.messages.push(this.message);
                axios.post('/send', {
                    message: this.message,
                    chat: this.chat
                })
                    .then(response => {
                     
                        this.message='';
                        
                    })
                    .catch(err => {
                        this.message = '';
                        console.log(err);
                    });
            }
        },
        getTime() {
            var time = new Date();

            return `${time.getHours()}:${time.getMinutes()}`;

        },
        getOldMessages() {

            axios.get('/get-old-message')
                .then(response => {
                    if (response.data.chat && response.data.chat!=null ) {
                        if(response.data.chat)
                        {
                            this.chat = response.data.chat;
                        }
                      
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }

    },
    mounted() {
        this.getOldMessages();
        Echo.private('chat')
            .listen('ChatEvent', (e) => {
                this.chat.color.push("warning");
                this.chat.user.push(e.user);
                this.chat.time.push(this.getTime());
                this.chat.messages.push(e.message);
                axios.post('/save-to-session', {
                    chat: this.chat
                })
                    .then(response => {
                        
                    })
                    .catch(err => {
                        this.message = '';
                        console.log(err);
                    });
            }).listenForWhisper('typing', (e) => {
                if (e.name != '') {
                    this.typing = " typing ..."
                } else {
                    this.typing = ""
                }

            });
        Echo.join(`chat`)
            .here((users) => {

            })
            .joining((user) => {
                this.$toaster.success(user.name + 'joined chat room');

            })
            .leaving((user) => {
                this.$toaster.warning(user.name + 'leave chat room');

            });

    },
});
