import {computed, effect, Injectable, signal, WritableSignal} from '@angular/core';
import {AuthChangeEvent, createClient, SupabaseClient} from "@supabase/supabase-js";
import {Router} from "@angular/router";
import {environment} from "../../../../environments/environment.development";
import {User} from "../interfaces/user";
import {LoginDataInterface} from "../interfaces/login-data-interface";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private supaBase: SupabaseClient;
  currentUser = signal<User | null>(null);
  isAuthenticated = computed(() => !!this.currentUser());

  constructor(private router: Router) {
    this.supaBase = createClient(environment.supabaseUrl, environment.supabaseKey);

    effect(() => {
      this.supaBase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          this.currentUser.set(session?.user as unknown as User);
        } else if (event === 'SIGNED_OUT') {
          this.currentUser.set(null);
        }
      });
    });

    this.loadUser().then(r => console.log('User loaded'));
  }

  async loadUser() {
    if (!this.currentUser()) {
      const user = await this.supaBase.auth.getUser();
      this.currentUser.set(user.data.user as unknown as User);
      console.log('User loaded from storage');
    }
    console.log('User already loaded');
  }

  signUp(credentials: { email: any; password: any }) {
    return this.supaBase.auth.signUp(credentials)
  }

  signIn(credentials: LoginDataInterface) {
    return this.supaBase.auth.signInWithPassword(credentials)
  }

  sendPwReset(email: string) {
    return this.supaBase.auth.resetPasswordForEmail(email)
  }

  async signOut() {
    await this.supaBase.auth.signOut()
    await this.router.navigateByUrl('/', {replaceUrl: true})
  }

  getCurrentUser(){
    return this.currentUser
  }

  getCurrentUserId(): string | null {
    if (this.currentUser()) {
      return (this.currentUser() as User).id
    } else {
      return null
    }
  }
}
