import { getCurrentInstance, reactive, Ref, toRefs, watch } from "vue";
import VueRouter from "vue-router";

// Thanks: https://medium.com/better-programming/reactive-vue-routes-with-the-composition-api-18c1abd878d1
type UseRouterType = {
  router: VueRouter;
  route: Ref;
};
export const useRouter = (): UseRouterType | null => {
  const currentInstance = getCurrentInstance();
  if (!currentInstance) return null;

  const vm = currentInstance.proxy;

  const state = reactive({
    route: vm.$route,
  });

  watch(
    () => vm.$route,
    (route) => {
      state.route = route;
    }
  );

  return { ...toRefs(state), router: vm.$router };
};
