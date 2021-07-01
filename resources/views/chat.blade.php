@extends('layouts.app')
  @section('style')
  <style>
		.list-group{
			overflow-y: scroll;
			height: 200px;
		}

  </style>
  @stop
  @section('content')
     <div class="container">
            <div class="row justify-content-center" id="app">
                <div class="col-md-8">
                    <li class="list-group-item active">Chat Room 
                    </li>
                    <div class="badge badge-pill badge-primary">@{{ typing }}</div>
                    <ul class="list-group" v-chat-scroll>
                        
                      <message
                       v-for="value,index in chat.messages"
                      :key=value,index
                      :color=chat.color[index]
                      :user=chat.user[index]
                      :time=chat.time[index]
                     
                      >
                          @{{value }}
                      </message>
                    </ul>
                      <input type="text" class="form-control" placeholder="Type your message here..." v-model='message' @keyup.enter='send'>
                      <br>
                </div>
            </div>
     </div>
  
@stop
@section('scripts')
<script src="{{asset('js/app.js')}}"></script>
@stop
