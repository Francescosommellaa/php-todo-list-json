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
        const data = new FormData();
        data.append('text', this.newTask.title);
        data.append('description', this.newTask.description);

        axios.post(this.apiUrl, data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(res => {
            this.list = res.data;
        })

        this.newTask.title = '';
        this.newTask.description = '';
    },

    mounted() {
        this.getApi();
    }

}).mount('#app');