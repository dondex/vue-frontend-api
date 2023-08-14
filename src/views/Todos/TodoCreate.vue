<template>
    <div>
        <div class="container mt-5">
            <div class="card">
                <div class="card-header">
                    <h4>Add Todo</h4>
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
                        <button type="button" @click="saveTodo" class="btn btn-primary">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'todoCreate',
    data(){
        return {
            errorList: '',
            model: {
                todo: {
                    title: '',
                    description: ''
                }
            }
        }
    },
    methods: {

        saveTodo(){
            
            var mythis = this;
            axios.post('http://127.0.0.1:8000/api/todos', this.model.todo)
                .then(res => {

                    console.log(res.data);
                    alert(res.data.message);

                    this.model.todo  = {
                        title: '',
                        description: ''
                    }
                    this.errorList = '';
            })
            .catch(function (error) {
                if (error.response) {

                    if(error.response.status == 422){
                        mythis.errorList = error.response.data.errors;
                    }
                
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
                } else if (error.request) {
               
                console.log(error.request);
                } else {
                
                console.log('Error', error.message);
                }
            })
        }
    }
}

</script>

