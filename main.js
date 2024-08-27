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

        if (this.newTask.title.length < 3 || this.newTask.description.length < 3) {
            allert('Il titolo e la descrizione devono avere almeno 3 caratteri')
        } else {
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
        }

        toggleDone(index) {
            console.log(index);
            const data = new FormData();
            data.append('indexToToggle', index);

            axios.post(this.apiUrl, data, {
            }).then(res => {
                this.list = res.data;
            })
        }
    },

    mounted() {
        this.getApi();
    }

}).mount('#app');