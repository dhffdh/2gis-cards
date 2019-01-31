'use strict';

const cardTypes = {
    narrow: 'narrow',
    wide: 'wide',
};

Vue.component('app-comp', {
    data: function () {
        return {
            items: [], //карточки
            isOver: false // свойство-hover на бэкграунде
        }
    },
    template: `
        <div class="b-container" v-bind:class="{ 'hover':  isOver}" v-on:mouseover="onHover" v-on:mouseleave="isOver = false">
            <ul class="b-list">
                <li 
                    class="b-item" 
                    v-for="(item, index) in items" 
                    v-bind:class="[ 'b-item--'+item.type , isActive(index,items) ? 'active' : '' ]"
                    v-on:click="clickHandler"
                    >
                    <div class="b-item__number">{{ index+1 }}</div>
                </li>
            </ul>
        </div>
    `,
    methods: {
        //определение последней активной карточки
        isActive: function (index, list) {
            if(list.length === 1)
                return false;
            return list.length === (index+1)
        },

        //ховер на бэкграунд
        onHover: function (e) {
            //console.log(e.target);
            if(e.target.classList.contains('b-container')){
                this.isOver = true;
            }else{
                this.isOver = false;
            }
        },

        //клик по карточке
        clickHandler: function (e) {
            //console.log('clickHandler e.shiftKey , e.altKey:', e.shiftKey, e.altKey );
            if(!e.shiftKey && !e.altKey){
                this.deleteCard();
            }else
            if(e.shiftKey && !e.altKey){
                this.addCard(cardTypes.narrow);
            }else
            if(e.shiftKey && e.altKey){
                this.addCard(cardTypes.wide);
            }
        },
        // метод добавления карточки
        addCard: function (typeVal) {
            //console.log('addCard', typeVal);
            this.items.push({ type: typeVal });
            this.pushState();
        },

        //удаление карточки
        deleteCard: function () {
            //console.log('deleteCar');
            this.items.splice(-1,1);
            this.pushState();
        },

        //чтение стейта из истории браузера
        onPopstateHandler: function (event) {
            //console.log('onPopstateHandler event.state', event.state);
            if(!!event.state){
                this.items = event.state;
            }
        },

        //обновление стейта истории после добавления или удаления карточек
        pushState: function () {
            //console.log('onPushState this.items,', this.items,);
            history.pushState(this.items, null, null );
        }

    },
    created: function () {

        if(!!cards)
            this.items = cards; //подягиваем элементы из глобального массива cards
        
        this.pushState(); // Регистрируем начальный стейт в истории браузера
        window.onpopstate = this.onPopstateHandler; // подписываемся на переходы по истории
    }

});

















var app = new Vue({el: '#app'});