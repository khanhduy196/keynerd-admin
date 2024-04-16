import {
  useHttpQueryService,
  useHttpMutationService,
} from "./httpService.hook";
import { useLoading } from "./loading.hook";
import { useStateWithPrevious } from "./stateWithPrevious.hook";
import { useError } from "./error.hook";
import { useNumericParam } from "./numeric-param.hook";
import { useInViewport } from "./is-in-viewport.hook";
import { useDebounce } from "./debounce.hook";
import { useUpdateEffect } from "./update-effect.hook";
import { useFormBlockNavigation } from "./form-block-navigation.hook";
import { useOutsideClick } from "./outside-click.hook";

export {
  useHttpQueryService,
  useHttpMutationService,
  useLoading,
  useStateWithPrevious,
  useError,
  useNumericParam,
  useInViewport,
  useDebounce,
  useUpdateEffect,
  useFormBlockNavigation,
  useOutsideClick,
};
