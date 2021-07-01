<template>
<div>
 <li :class="className"> <slot></slot> 

   <span> {{time}}</span>
  </li>
   <small class="badge float-right" :class='badgeClass'> {{user}}</small>
  </div>
</template>

<script>
    export default {
     props:[
    'color',
     'user',
     'time'
     ],
     computed:{
      className()
   
            {
                 
              return "list-group-item bg-"+this.color;
            },
            badgeClass()
            {
              return "badge-"+this.color;
            }
     },
       
    }
</script>
