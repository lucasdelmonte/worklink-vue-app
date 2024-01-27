<template>
  <div>
    <div v-if="drawerRequest.requestData.estado != 'CANCELADA' && drawerRequest.requestData.estado != 'FINALIZADA'" class="drawer__create-budget drawer__create-budget--provider" :class="{ 'drawer__create-budget--open': creatingBudget }">
      <h2 class="form__title form__title--left">Presupuesto</h2>
      <div class="field">
        <input v-model="budgetDate" class="field__input" id="budget-date" type="date" />
        <label class="field__label" for="budget-date">Fecha de realización*</label>
      </div>
      <div class="field">
        <input v-model="budgetAmount" class="field__input" id="budget-amount" type="number" />
        <label class="field__label" for="budget-amount">Presupuesto*</label>
      </div>
    </div>
    <template v-if="drawerRequest.requestData.estado === 'PENDIENTE'"> 
      <template v-if="!creatingBudget">
        <button class="drawer__create-request button button--primary-black" @click="toggleBudget()">Crear presupuesto</button>
      </template>
      <template v-else>
        <button class="drawer__create-request button button--primary-black" @click="createBudget(drawerRequest.requestData._id)">Crear</button>
        <button class="drawer__create-request button button--primary-black" @click="toggleBudget()">Volver</button>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, watch, computed } from 'vue'
  import type { Ref } from 'vue'
  import { useDrawerRequestStore } from '../../stores/drawerRequest'

  const drawerRequest = useDrawerRequestStore()
  const creatingBudget = ref(false) as Ref<boolean>
  const budgetAmount = ref(0) as Ref<number>
  const budgetDate = ref('') as Ref<string>

  const toggleBudget = () => { 
    creatingBudget.value = !creatingBudget.value
  }

  const createBudget = async (id: string | undefined) => { 
    console.log(id, budgetAmount.value, budgetDate.value)
    if(!drawerRequest.requestData || !id) return
    await drawerRequest.createBudget(id, budgetAmount.value, budgetDate.value)
  }

  console.log(drawerRequest)
</script>

<style scoped>

</style>