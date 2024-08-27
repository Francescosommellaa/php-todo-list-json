const { createApp } = Vue;

createApp({
    data() {
        return {
            title: 'Todo List',
            apiUrl: 'server.php',
            list: [],
            newTask: {
                title: '',
                description: '',
            }
        }
    },

    methods: {
        getApi() {
            axios.get(this.apiUrl)
                .then(res => {
                    this.list = res.data;
                })
        }
    },

    addTask() {
        const data = {
            text: this.newTask.title,
            description: this.newTask.description
        }
        axios.post(this.apiUrl, data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(res => {
            this.list = res.data;
        })

    },

    mounted() {
        this.getApi();
    }

}).mount('#app');