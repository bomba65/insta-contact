<template>
  <div class="app">
    <AppHeader fixed>
      <b-navbar-nav class="">
        <b-nav-item class="px-3" to="/links">Ссылки</b-nav-item>
        <b-dropdown
          split
          split-variant="outline-primary"
          variant="primary"
          text="Страницы"
          class="m-2"
          v-if="name === 'Pages'"
        >
          <b-dropdown-item href="#" v-for="(page, index) in pages" :key="index" @click="changePage(index)">/{{ page }}</b-dropdown-item>
          <b-dropdown-item-button class="dropdown-primary" @click="showNewPageModal=true">Добавить новую страницу</b-dropdown-item-button>
        </b-dropdown>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item class="d-md-down-none">
          <i class="icon-bell"></i>
          <b-badge pill variant="danger">5</b-badge>
        </b-nav-item>
        <b-nav-item class="d-md-down-none">
          <i class="icon-list"></i>
        </b-nav-item>
        <b-nav-item class="d-md-down-none">
          <i class="icon-location-pin"></i>
        </b-nav-item>
        <DefaultHeaderDropdownAccnt/>
      </b-navbar-nav>
    </AppHeader>
    <div class="app-body">

      <main class="main py-4">
        <router-view></router-view>
      </main>
    </div>

    <b-modal title="Добавить новую страницу" size="lg" class="modal-primary block-modal-cards" v-model="showNewPageModal">
			<div>
				<label>Ссылка страницы</label>
				<b-form-input type="text" v-model="newPageLink" placeholder=""></b-form-input>
			</div>
			<div slot="modal-footer" class="w-100">
				
		        <b-button
		          variant="secondary"
		          class="float-right"
		          @click="showModal=false"
		        >
		          Закрыть
		        </b-button>
				<b-button
					variant="primary"
					class="float-right mr-3"
					@click="addNewPage"
				>
					Сохранить
				</b-button>
		  </div>
		</b-modal>

    <TheFooter>
      <!--footer-->
      <div>
        <a href="https://instacontact.kz">InstaContact</a>
        <span class="ml-1">&copy; 2018 creativeLabs.</span>
      </div>
      <div class="ml-auto">
        <span class="mr-1">Powered by</span>
        <a href="http://elefanto.kz">Elefanto</a>
      </div>
    </TheFooter>
  </div>
</template>

<script>
//import nav from '@/_nav'
import { Header as AppHeader, SidebarToggler, Sidebar as AppSidebar, SidebarFooter, SidebarForm, SidebarHeader, SidebarMinimizer, SidebarNav, Aside as AppAside, AsideToggler, Footer as TheFooter, Breadcrumb } from '@coreui/vue'
import DefaultAside from './DefaultAside'
import DefaultHeaderDropdownAccnt from './DefaultHeaderDropdownAccnt'

import { SlickList, SlickItem } from 'vue-slicksort';

export default {
  name: 'DefaultContainer',
  components: {
    AsideToggler,
    AppHeader,
    AppSidebar,
    AppAside,
    TheFooter,
    Breadcrumb,
    DefaultAside,
    DefaultHeaderDropdownAccnt,
    SidebarForm,
    SidebarFooter,
    SidebarToggler,
    SidebarHeader,
    SidebarNav,
    SidebarMinimizer
  },
  data () {
    return {
      showNewPageModal: false,
      newPageLink: ''
    }
  },
  computed: {
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched.filter((route) => route.name || route.meta.label )
    },
    pages: {
			get() {
				return this.$store.getters['pages/getPages']
			}
		},
  },
  methods: {
    changePage(selectedPage) {
      this.$store.commit('pages/setSelectedPage', selectedPage)
    },
    addNewPage() {
      this.$store.commit('pages/addPage', this.newPageLink)
      this.newPageLink = ''
      this.showNewPageModal = false
    }
  }
}
</script>