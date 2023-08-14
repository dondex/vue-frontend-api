<template>
   <div>
    <div class="container">
        <div class="card">
        <div class="card-header">
            <h4>Todos
                <RouterLink to="/todo/create" class="btn btn-primary float-end">
                    Add Todo
                </RouterLink>
            </h4>
        </div>
        <div class="card-body">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Created At</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody v-if="this.todos.length > 0">
                    <tr v-for="(todo, index) in this.todos" :key="index">
                        <td>{{ todo.id }}</td>
                        <td>{{ todo.title }}</td>
                        <td>{{ todo.description }}</td>
                        <td>{{ todo.created_at }}</td>
                        <td>
                            <RouterLink :to="{ path: '/todos/'+todo.id+'/edit'}" class="btn btn-success ">
                                Edit
                            </RouterLink>
                            <button type="button" @click="deleteTodo(todo.id)" class="btn btn-danger ">
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="5">Loading...</td>
                    </tr>
                </tbody>
            </table>
        </div>
        </div>
    </div>
   </div>
</template>

<script>
import axios from 'axios'


export default {
    name:'todos',
    data(){
        return {
            todos: []
        }
    },
    mounted(){

        this.getTodos();
        // console.log('i am here');
    },
    methods: {
        getTodos(){

            axios.get('http://127.0.0.1:8000/api/todos').then(res => {
                this.todos = res.data.todos
                console.log(this.todos);
            });
        },

        deleteTodo(todoId){
            
            if(confirm('Are you sure, you want to delete this data?')){
                // console.log(todoId);

                axios.delete(`http://127.0.0.1:8000/api/todos/${todoId}/delete`)
                    .then(res => {

                        alert(res.data.message);
                        this.getTodos();
                })
                .catch(function (error) {
                    if (error.response) {

                        if(error.response.status == 404){
                            
                            alert(error.response.data.message);
                        }     
                    }
                });
            }
        },
    },

}
</script>

