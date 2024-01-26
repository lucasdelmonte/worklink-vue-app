<template>
  <div>
    <div v-if="responseBudgets" class="drawer__show-budget drawer__show-budget--client" :class="{ 'drawer__show-budget--open': showingBudget }">
      <h2 class="form__title form__title--left">Presupuestos</h2>
      <template v-for="(budget, index) in responseBudgets">
        <div class="budget">
          <div class="field">
            <input v-model="budget.date" class="field__input" :id="`budget-date-${ index }`" type="date" disabled />
            <label class="field__label" :for="`budget-date-${ index }`">Fecha de realización</label>
          </div>
          <div class="field">
            <input v-model="budget.amount" class="field__input" :id="`budget-amount-${ index }`" type="amount" disabled />
            <label class="field__label" :for="`budget-amount-${ index }`">Monto</label>
          </div>
        </div>
        <div class="field-divider">
          <div class="line"></div>
          <div class="circle"></div>
          <div class="line"></div>
        </div>
      </template>
    </div>
    <template v-if="!creatingBudget">
      <button class="drawer__create-request button button--primary-black" v-if="responseBudgets" @click.prevent="toggleListBudgets()">Ver presupuestos</button>
    </template>
    <template v-else>
      <button class="drawer__create-request button button--primary-black" @click="toggleListBudgets()">Volver</button>
    </template>

    <button class="drawer__create-request button button--primary-black" v-if="drawerRequest.requestAction === 'CREATE'" @click.prevent="createRequest">Crear solicitud</button>
    <button class="drawer__create-request button button--primary-black" v-if="drawerRequest.requestAction === 'EDIT'" @click.prevent="editRequest">Actualizar solicitud</button>
    <button class="drawer__create-request button button--primary-black" v-if="drawerRequest.requestAction === 'EDIT' && creatingBudget" @click="updateState(drawerRequest.requestData._id, 'ACEPTADA')">Aceptar solicitud</button>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, watch, computed } from 'vue'
  import { useDrawerRequestStore } from '../../stores/drawerRequest'
  import type { IBudget } from '../../interfaces/BudgetInterfaces'

  const drawerRequest = useDrawerRequestStore()

  const responseBudgets = ref([]) as Ref<IBudget[]> | undefined
  const showingBudget = ref(true) as Ref<boolean>

  const toggleListBudgets = () => { 
    showingBudget.value = !showingBudget.value
  }

  const getBudgets = async () => { 
    if(responseBudgets) {
      responseBudgets.value = await drawerRequest.getBudgets(drawerRequest.requestData._id) as IBudget[]
      console.log(responseBudgets.value)
    }
  }

  const updateState = async (id: string | undefined, state: string) => {
    if(!id) return
    const result = await drawerRequest.updateState(id, state)

    if(result) drawerRequest.requestAction = 'SEE'
  }

  console.log(drawerRequest)
</script>

<style scoped>

</style>