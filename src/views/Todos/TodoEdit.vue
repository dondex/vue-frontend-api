<template>
    <div>
        <div class="container mt-5">
            <div class="card">
                <div class="card-header">
                    <h4>Edit Todo</h4>
                </div>
                <div class="card-body">

                    <ul class="alert alert-warning" v-if="Object.keys(this.errorList).length > 0">
                        <li class="mb-0 ms-3" v-for="(error, index) in this.errorList" :key="index">
                            {{ error[0] }}
                        </li>
                    </ul>

                    <div class="mb-3">
                        <label for="">Title</label>
                        <input type="text" v-model="model.todo.title" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="">Description</label>
                        <textarea type="text" v-model="model.todo.description" rows="5" class="form-control"></textarea>
                    </div>
                    <div class="mb-3">
                        <button type="button" @click="updateTodo" class="btn btn-primary">Update</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'todoEdit',
    data(){
        return {
            todoId: '',
            errorList: '',
            model: {
                todo: {
                    title: '',
                    description: ''
                }
            }
        }
    },
    mounted(){
        // console.log(this.$route.params.id);
        this.todoId = this.$route.params.id;
        this.getTodoData(this.$route.params.id);
    },
    methods: {

        getTodoData(todoId){

            axios.get(`http://127.0.0.1:8000/api/todos/${todoId}/edit`)
                .then(res => {
                    console.log(res.data.todo);

                    this.model.todo = res.data.todo
            })
            .catch(function (error) {
                if (error.response) {

                    if(error.response.status == 404){
                        
                        alert(error.response.data.message);
                    }     
                }
            });
        },
        updateTodo(){
            
            var mythis = this;
            axios.put(`http://127.0.0.1:8000/api/todos/${this.todoId}/edit`, this.model.todo)
                .then(res => {

                    console.log(res.data);
                    alert(res.data.message);

                    
                    this.errorList = '';
            })
            .catch(function (error) {
                if (error.response) {

                    if(error.response.status == 422){
                        mythis.errorList = error.response.data.errors;
                    }

                    if(error.response.status == 404){
                        alert(error.response.data.message);
                    }
                
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
                } else if (error.request) {
               
                console.log(error.request);
                } else {
                
                console.log('Error', error.message);
                }
            });
        }
    }
}

</script>

