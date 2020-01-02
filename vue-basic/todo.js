const vm = new Vue({
    el: "#app",
    data: {
        list:'',
        lists: [{ 
            flag:true,
            isSelected: false ,
            title:'吃饭'
        },{ 
            flag:true,
            isSelected: false ,
            title:'睡觉'
        }],
        hash:''
    },
    created(){
        this.lists = JSON.parse(localStorage.getItem('data')) || this.lists
        //监控页面window.location.hash 值得变化
        //初次进入页面如果没有hash，赋给一个 #all 哈希值 
        this.hash = window.location.hash.slice(1) || "all"
        window.addEventListener('hashchange',() => {
            //在window上监听 hashchange事件，如果哈希值变化了，更新 hash变量
            this.hash = window.location.hash.slice(1)
        })
    },
    watch:{
        lists:{
            handler(){
                localStorage.setItem('data', JSON.stringify(this.lists))
            },
            deep:true
        }
    },
    computed:{
        completed(){
            return this.lists.filter(item => item.isSelected === true).length
        },
        incompleted(){
            return this.lists.length - this.completed 
        },
        newLists(){
            if(this.hash==='all') return this.lists
            if(this.hash === 'completed') return this.lists.filter(item => item.isSelected === true)
            if(this.hash === 'incompleted') return this.lists.filter(item => item.isSelected === false)
            return this.lists
        }
    },
    directives:{
        focus(el,bind){
            //console.log(arguments)
            if(bind.value){
                el.focus()
            }
        }
    },
    methods:{
        addTodo(){
            this.lists.push({isSelected:false,title:this.list,flag:true})
            this.list = ''
        },
        deleteTodo(event,item){
            this.lists = this.lists.filter( element => element!==item)
        },
        toggleSelect(event,item){
            this.lists.forEach(element => {
                if(item === element){
                    item.isSelected = !item.isSelected
                }
            })
        },
        toggleFlag(event,item){
            console.log('123')
            this.lists.forEach(element => {
                if(item === element){
                    element.flag = !element.flag
                }
            })
        }
    }
})