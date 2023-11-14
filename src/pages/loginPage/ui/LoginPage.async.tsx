import { lazyRetry } from "@/shared/lib/lazyRetry/lazyWithRetry";
export const LoginPageasync = lazyRetry(()=> import('./LoginPage'));