export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      ad_events: {
        Row: {
          created_at: string
          id: number
          purpose: string
          user_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          purpose: string
          user_id: number
        }
        Update: {
          created_at?: string
          id?: number
          purpose?: string
          user_id?: number
        }
        Relationships: []
      }
      admins: {
        Row: {
          created_at: string
          role: string
          username: string
        }
        Insert: {
          created_at?: string
          role?: string
          username: string
        }
        Update: {
          created_at?: string
          role?: string
          username?: string
        }
        Relationships: []
      }
      clau_ad_views: {
        Row: {
          completed_at: string | null
          id: string
          placement: string
          started_at: string
          tg_id: number
          used_at: string | null
        }
        Insert: {
          completed_at?: string | null
          id?: string
          placement: string
          started_at?: string
          tg_id: number
          used_at?: string | null
        }
        Update: {
          completed_at?: string | null
          id?: string
          placement?: string
          started_at?: string
          tg_id?: number
          used_at?: string | null
        }
        Relationships: []
      }
      clau_admins: {
        Row: {
          added_by: string | null
          created_at: string
          id: string
          role: string
          tg_id: number | null
          username: string
        }
        Insert: {
          added_by?: string | null
          created_at?: string
          id?: string
          role?: string
          tg_id?: number | null
          username: string
        }
        Update: {
          added_by?: string | null
          created_at?: string
          id?: string
          role?: string
          tg_id?: number | null
          username?: string
        }
        Relationships: []
      }
      clau_bonus_offers: {
        Row: {
          amount: number
          created_at: string
          expires_at: string
          id: string
          source: string
          tg_id: number
          used_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          expires_at?: string
          id?: string
          source: string
          tg_id: number
          used_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          expires_at?: string
          id?: string
          source?: string
          tg_id?: number
          used_at?: string | null
        }
        Relationships: []
      }
      clau_broadcasts: {
        Row: {
          created_at: string
          cursor: number
          done: boolean
          failed: number
          gift_id: string | null
          id: string
          key: string
          kind: string
          locked_until: string | null
          photo_url: string | null
          sent: number
          text: string
        }
        Insert: {
          created_at?: string
          cursor?: number
          done?: boolean
          failed?: number
          gift_id?: string | null
          id?: string
          key: string
          kind?: string
          locked_until?: string | null
          photo_url?: string | null
          sent?: number
          text: string
        }
        Update: {
          created_at?: string
          cursor?: number
          done?: boolean
          failed?: number
          gift_id?: string | null
          id?: string
          key?: string
          kind?: string
          locked_until?: string | null
          photo_url?: string | null
          sent?: number
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "clau_broadcasts_gift_id_fkey"
            columns: ["gift_id"]
            isOneToOne: false
            referencedRelation: "clau_gifts"
            referencedColumns: ["id"]
          },
        ]
      }
      clau_game_sessions: {
        Row: {
          finished_at: string | null
          game: string
          id: string
          reward: number | null
          score: number | null
          started_at: string
          tg_id: number
        }
        Insert: {
          finished_at?: string | null
          game: string
          id?: string
          reward?: number | null
          score?: number | null
          started_at?: string
          tg_id: number
        }
        Update: {
          finished_at?: string | null
          game?: string
          id?: string
          reward?: number | null
          score?: number | null
          started_at?: string
          tg_id?: number
        }
        Relationships: []
      }
      clau_gift_claims: {
        Row: {
          created_at: string
          gift_id: string
          tg_id: number
        }
        Insert: {
          created_at?: string
          gift_id: string
          tg_id: number
        }
        Update: {
          created_at?: string
          gift_id?: string
          tg_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "clau_gift_claims_gift_id_fkey"
            columns: ["gift_id"]
            isOneToOne: false
            referencedRelation: "clau_gifts"
            referencedColumns: ["id"]
          },
        ]
      }
      clau_gifts: {
        Row: {
          amount: number
          claims: number
          created_at: string
          expires_at: string
          id: string
          max_claims: number | null
          title: string
        }
        Insert: {
          amount: number
          claims?: number
          created_at?: string
          expires_at?: string
          id?: string
          max_claims?: number | null
          title?: string
        }
        Update: {
          amount?: number
          claims?: number
          created_at?: string
          expires_at?: string
          id?: string
          max_claims?: number | null
          title?: string
        }
        Relationships: []
      }
      clau_jobs: {
        Row: {
          key: string
          last_run_at: string
        }
        Insert: {
          key: string
          last_run_at?: string
        }
        Update: {
          key?: string
          last_run_at?: string
        }
        Relationships: []
      }
      clau_news: {
        Row: {
          id: string
          message_id: number | null
          posted_at: string
          slot: string
          text: string
        }
        Insert: {
          id?: string
          message_id?: number | null
          posted_at?: string
          slot: string
          text: string
        }
        Update: {
          id?: string
          message_id?: number | null
          posted_at?: string
          slot?: string
          text?: string
        }
        Relationships: []
      }
      clau_payments: {
        Row: {
          amount_nano: number
          confirmed_at: string | null
          created_at: string
          expires_at: string
          id: string
          kind: string
          memo: string
          ref_id: string | null
          result: Json | null
          sender: string | null
          status: string
          tg_id: number
          tx_hash: string | null
        }
        Insert: {
          amount_nano: number
          confirmed_at?: string | null
          created_at?: string
          expires_at?: string
          id?: string
          kind?: string
          memo: string
          ref_id?: string | null
          result?: Json | null
          sender?: string | null
          status?: string
          tg_id: number
          tx_hash?: string | null
        }
        Update: {
          amount_nano?: number
          confirmed_at?: string | null
          created_at?: string
          expires_at?: string
          id?: string
          kind?: string
          memo?: string
          ref_id?: string | null
          result?: Json | null
          sender?: string | null
          status?: string
          tg_id?: number
          tx_hash?: string | null
        }
        Relationships: []
      }
      clau_servers: {
        Row: {
          active: boolean
          created_at: string
          duration_days: number
          hue: number
          id: string
          name: string
          price_ton: number
          rate_per_hour: number
          slug: string
          sort: number
        }
        Insert: {
          active?: boolean
          created_at?: string
          duration_days?: number
          hue?: number
          id?: string
          name: string
          price_ton: number
          rate_per_hour: number
          slug: string
          sort?: number
        }
        Update: {
          active?: boolean
          created_at?: string
          duration_days?: number
          hue?: number
          id?: string
          name?: string
          price_ton?: number
          rate_per_hour?: number
          slug?: string
          sort?: number
        }
        Relationships: []
      }
      clau_settings: {
        Row: {
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          key: string
          updated_at?: string
          value: Json
        }
        Update: {
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      clau_task_claims: {
        Row: {
          claimed_at: string | null
          started_at: string
          status: string
          task_id: string
          tg_id: number
        }
        Insert: {
          claimed_at?: string | null
          started_at?: string
          status?: string
          task_id: string
          tg_id: number
        }
        Update: {
          claimed_at?: string | null
          started_at?: string
          status?: string
          task_id?: string
          tg_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "clau_task_claims_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "clau_tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      clau_tasks: {
        Row: {
          active: boolean
          chat_id: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          kind: string
          reward: number
          sort: number
          target: number
          title: string
          url: string | null
        }
        Insert: {
          active?: boolean
          chat_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          kind?: string
          reward?: number
          sort?: number
          target?: number
          title: string
          url?: string | null
        }
        Update: {
          active?: boolean
          chat_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          kind?: string
          reward?: number
          sort?: number
          target?: number
          title?: string
          url?: string | null
        }
        Relationships: []
      }
      clau_user_servers: {
        Row: {
          created_at: string
          expires_at: string
          id: string
          payment_id: string | null
          rate_per_hour: number
          server_id: string
          tg_id: number
        }
        Insert: {
          created_at?: string
          expires_at: string
          id?: string
          payment_id?: string | null
          rate_per_hour: number
          server_id: string
          tg_id: number
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: string
          payment_id?: string | null
          rate_per_hour?: number
          server_id?: string
          tg_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "clau_user_servers_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: true
            referencedRelation: "clau_payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clau_user_servers_server_id_fkey"
            columns: ["server_id"]
            isOneToOne: false
            referencedRelation: "clau_servers"
            referencedColumns: ["id"]
          },
        ]
      }
      clau_users: {
        Row: {
          ads_date: string | null
          ads_today: number
          ads_total: number
          balance: number
          bonus_date: string | null
          boost_from: string | null
          boost_until: string | null
          boosts_today: number
          bot_blocked: boolean
          boxes_today: number
          created_at: string
          doubles_today: number
          first_name: string | null
          free_spin_used: boolean
          games_date: string | null
          games_today: number
          games_total: number
          is_banned: boolean
          last_ad_at: string | null
          last_seen: string
          mining_ends_at: string | null
          mining_last_tick: string | null
          mining_pending: number
          mining_rate: number
          mining_started_at: string | null
          photo_url: string | null
          ref_count: number
          ref_earned: number
          referrer_id: number | null
          spins_today: number
          started_bot: boolean
          streak: number
          streak_date: string | null
          streak_lost: number
          streak_lost_at: string | null
          tg_id: number
          total_mined: number
          username: string | null
          vip_until: string | null
          wallet_address: string | null
        }
        Insert: {
          ads_date?: string | null
          ads_today?: number
          ads_total?: number
          balance?: number
          bonus_date?: string | null
          boost_from?: string | null
          boost_until?: string | null
          boosts_today?: number
          bot_blocked?: boolean
          boxes_today?: number
          created_at?: string
          doubles_today?: number
          first_name?: string | null
          free_spin_used?: boolean
          games_date?: string | null
          games_today?: number
          games_total?: number
          is_banned?: boolean
          last_ad_at?: string | null
          last_seen?: string
          mining_ends_at?: string | null
          mining_last_tick?: string | null
          mining_pending?: number
          mining_rate?: number
          mining_started_at?: string | null
          photo_url?: string | null
          ref_count?: number
          ref_earned?: number
          referrer_id?: number | null
          spins_today?: number
          started_bot?: boolean
          streak?: number
          streak_date?: string | null
          streak_lost?: number
          streak_lost_at?: string | null
          tg_id: number
          total_mined?: number
          username?: string | null
          vip_until?: string | null
          wallet_address?: string | null
        }
        Update: {
          ads_date?: string | null
          ads_today?: number
          ads_total?: number
          balance?: number
          bonus_date?: string | null
          boost_from?: string | null
          boost_until?: string | null
          boosts_today?: number
          bot_blocked?: boolean
          boxes_today?: number
          created_at?: string
          doubles_today?: number
          first_name?: string | null
          free_spin_used?: boolean
          games_date?: string | null
          games_today?: number
          games_total?: number
          is_banned?: boolean
          last_ad_at?: string | null
          last_seen?: string
          mining_ends_at?: string | null
          mining_last_tick?: string | null
          mining_pending?: number
          mining_rate?: number
          mining_started_at?: string | null
          photo_url?: string | null
          ref_count?: number
          ref_earned?: number
          referrer_id?: number | null
          spins_today?: number
          started_bot?: boolean
          streak?: number
          streak_date?: string | null
          streak_lost?: number
          streak_lost_at?: string | null
          tg_id?: number
          total_mined?: number
          username?: string | null
          vip_until?: string | null
          wallet_address?: string | null
        }
        Relationships: []
      }
      clau_withdrawals: {
        Row: {
          address: string
          amount: number
          created_at: string
          id: string
          note: string | null
          processed_at: string | null
          processed_by: string | null
          status: string
          tg_id: number
        }
        Insert: {
          address: string
          amount: number
          created_at?: string
          id?: string
          note?: string | null
          processed_at?: string | null
          processed_by?: string | null
          status?: string
          tg_id: number
        }
        Update: {
          address?: string
          amount?: number
          created_at?: string
          id?: string
          note?: string | null
          processed_at?: string | null
          processed_by?: string | null
          status?: string
          tg_id?: number
        }
        Relationships: []
      }
      gama_ad_views: {
        Row: {
          created_at: string
          id: number
          purpose: string
          user_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          purpose: string
          user_id: number
        }
        Update: {
          created_at?: string
          id?: number
          purpose?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "gama_ad_views_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "gama_users"
            referencedColumns: ["tg_id"]
          },
        ]
      }
      gama_admins: {
        Row: {
          added_by: string | null
          created_at: string
          role: string
          username: string
        }
        Insert: {
          added_by?: string | null
          created_at?: string
          role?: string
          username: string
        }
        Update: {
          added_by?: string | null
          created_at?: string
          role?: string
          username?: string
        }
        Relationships: []
      }
      gama_game_sessions: {
        Row: {
          finished: boolean
          game: string
          id: string
          reward: number
          score: number
          started_at: string
          user_id: number
        }
        Insert: {
          finished?: boolean
          game: string
          id?: string
          reward?: number
          score?: number
          started_at?: string
          user_id: number
        }
        Update: {
          finished?: boolean
          game?: string
          id?: string
          reward?: number
          score?: number
          started_at?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "gama_game_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "gama_users"
            referencedColumns: ["tg_id"]
          },
        ]
      }
      gama_gifts: {
        Row: {
          amount: number
          claimed: boolean
          claimed_at: string | null
          created_at: string
          expires_at: string
          id: string
          user_id: number
        }
        Insert: {
          amount: number
          claimed?: boolean
          claimed_at?: string | null
          created_at?: string
          expires_at?: string
          id?: string
          user_id: number
        }
        Update: {
          amount?: number
          claimed?: boolean
          claimed_at?: string | null
          created_at?: string
          expires_at?: string
          id?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "gama_gifts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "gama_users"
            referencedColumns: ["tg_id"]
          },
        ]
      }
      gama_jobs: {
        Row: {
          created_at: string
          cursor: number
          done: boolean
          key: string
          sent: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          cursor?: number
          done?: boolean
          key: string
          sent?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          cursor?: number
          done?: boolean
          key?: string
          sent?: number
          updated_at?: string
        }
        Relationships: []
      }
      gama_news: {
        Row: {
          body: string
          created_at: string
          id: string
          message_id: number | null
          slot: string
        }
        Insert: {
          body: string
          created_at?: string
          id?: string
          message_id?: number | null
          slot: string
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          message_id?: number | null
          slot?: string
        }
        Relationships: []
      }
      gama_payments: {
        Row: {
          amount_nano: number
          confirmed_at: string | null
          created_at: string
          expires_at: string
          id: string
          kind: string
          memo: string
          ref_id: string | null
          status: string
          tx_hash: string | null
          user_id: number
          wallet: string | null
        }
        Insert: {
          amount_nano: number
          confirmed_at?: string | null
          created_at?: string
          expires_at?: string
          id?: string
          kind?: string
          memo: string
          ref_id?: string | null
          status?: string
          tx_hash?: string | null
          user_id: number
          wallet?: string | null
        }
        Update: {
          amount_nano?: number
          confirmed_at?: string | null
          created_at?: string
          expires_at?: string
          id?: string
          kind?: string
          memo?: string
          ref_id?: string | null
          status?: string
          tx_hash?: string | null
          user_id?: number
          wallet?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gama_payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "gama_users"
            referencedColumns: ["tg_id"]
          },
        ]
      }
      gama_post_pipeline: {
        Row: {
          created_at: string
          key: string
          lease_until: string | null
          paused_reason: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          key: string
          lease_until?: string | null
          paused_reason?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          key?: string
          lease_until?: string | null
          paused_reason?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      gama_servers: {
        Row: {
          active: boolean
          created_at: string
          duration_days: number
          id: string
          name: string
          price_ton: number
          rate_per_hour: number
          slug: string
          sort: number
        }
        Insert: {
          active?: boolean
          created_at?: string
          duration_days?: number
          id?: string
          name: string
          price_ton: number
          rate_per_hour: number
          slug: string
          sort?: number
        }
        Update: {
          active?: boolean
          created_at?: string
          duration_days?: number
          id?: string
          name?: string
          price_ton?: number
          rate_per_hour?: number
          slug?: string
          sort?: number
        }
        Relationships: []
      }
      gama_task_claims: {
        Row: {
          created_at: string
          task_id: string
          user_id: number
        }
        Insert: {
          created_at?: string
          task_id: string
          user_id: number
        }
        Update: {
          created_at?: string
          task_id?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "gama_task_claims_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "gama_tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gama_task_claims_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "gama_users"
            referencedColumns: ["tg_id"]
          },
        ]
      }
      gama_tasks: {
        Row: {
          active: boolean
          chat_id: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          image_url: string | null
          kind: string
          reward: number
          sort: number
          target: number
          title: string
          url: string | null
        }
        Insert: {
          active?: boolean
          chat_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          kind?: string
          reward: number
          sort?: number
          target?: number
          title: string
          url?: string | null
        }
        Update: {
          active?: boolean
          chat_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          kind?: string
          reward?: number
          sort?: number
          target?: number
          title?: string
          url?: string | null
        }
        Relationships: []
      }
      gama_user_servers: {
        Row: {
          created_at: string
          expires_at: string
          id: string
          payment_id: string | null
          rate_per_hour: number
          server_id: string
          user_id: number
        }
        Insert: {
          created_at?: string
          expires_at: string
          id?: string
          payment_id?: string | null
          rate_per_hour: number
          server_id: string
          user_id: number
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: string
          payment_id?: string | null
          rate_per_hour?: number
          server_id?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "gama_user_servers_server_id_fkey"
            columns: ["server_id"]
            isOneToOne: false
            referencedRelation: "gama_servers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gama_user_servers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "gama_users"
            referencedColumns: ["tg_id"]
          },
        ]
      }
      gama_users: {
        Row: {
          ads_date: string | null
          ads_today: number
          ads_total: number
          balance: number
          bot_blocked: boolean
          created_at: string
          first_name: string | null
          games_date: string | null
          games_today: number
          games_total: number
          is_banned: boolean
          last_ad_at: string | null
          last_seen: string
          mining_last_tick: string | null
          mining_pending: number
          mining_rate: number
          mining_started_at: string | null
          photo_url: string | null
          ref_count: number
          ref_earned: number
          referrer_id: number | null
          session_boosts: number
          started_bot: boolean
          tg_id: number
          total_mined: number
          username: string | null
          wallet_address: string | null
        }
        Insert: {
          ads_date?: string | null
          ads_today?: number
          ads_total?: number
          balance?: number
          bot_blocked?: boolean
          created_at?: string
          first_name?: string | null
          games_date?: string | null
          games_today?: number
          games_total?: number
          is_banned?: boolean
          last_ad_at?: string | null
          last_seen?: string
          mining_last_tick?: string | null
          mining_pending?: number
          mining_rate?: number
          mining_started_at?: string | null
          photo_url?: string | null
          ref_count?: number
          ref_earned?: number
          referrer_id?: number | null
          session_boosts?: number
          started_bot?: boolean
          tg_id: number
          total_mined?: number
          username?: string | null
          wallet_address?: string | null
        }
        Update: {
          ads_date?: string | null
          ads_today?: number
          ads_total?: number
          balance?: number
          bot_blocked?: boolean
          created_at?: string
          first_name?: string | null
          games_date?: string | null
          games_today?: number
          games_total?: number
          is_banned?: boolean
          last_ad_at?: string | null
          last_seen?: string
          mining_last_tick?: string | null
          mining_pending?: number
          mining_rate?: number
          mining_started_at?: string | null
          photo_url?: string | null
          ref_count?: number
          ref_earned?: number
          referrer_id?: number | null
          session_boosts?: number
          started_bot?: boolean
          tg_id?: number
          total_mined?: number
          username?: string | null
          wallet_address?: string | null
        }
        Relationships: []
      }
      gama_withdrawals: {
        Row: {
          address: string
          amount: number
          created_at: string
          id: string
          note: string | null
          processed_at: string | null
          status: string
          user_id: number
        }
        Insert: {
          address: string
          amount: number
          created_at?: string
          id?: string
          note?: string | null
          processed_at?: string | null
          status?: string
          user_id: number
        }
        Update: {
          address?: string
          amount?: number
          created_at?: string
          id?: string
          note?: string | null
          processed_at?: string | null
          status?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "gama_withdrawals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "gama_users"
            referencedColumns: ["tg_id"]
          },
        ]
      }
      game_sessions: {
        Row: {
          finished: boolean
          game: string
          id: string
          reward: number
          started_at: string
          user_id: number
        }
        Insert: {
          finished?: boolean
          game: string
          id?: string
          reward?: number
          started_at?: string
          user_id: number
        }
        Update: {
          finished?: boolean
          game?: string
          id?: string
          reward?: number
          started_at?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "game_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["tg_id"]
          },
        ]
      }
      gifts: {
        Row: {
          amount: number
          claimed: boolean
          claimed_at: string | null
          created_at: string
          id: string
          user_id: number
        }
        Insert: {
          amount: number
          claimed?: boolean
          claimed_at?: string | null
          created_at?: string
          id?: string
          user_id: number
        }
        Update: {
          amount?: number
          claimed?: boolean
          claimed_at?: string | null
          created_at?: string
          id?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "gifts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["tg_id"]
          },
        ]
      }
      gm_broadcasts: {
        Row: {
          created_at: string
          cursor: number
          done: boolean
          failed: number
          sent: number
          slot: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          cursor?: number
          done?: boolean
          failed?: number
          sent?: number
          slot: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          cursor?: number
          done?: boolean
          failed?: number
          sent?: number
          slot?: string
          updated_at?: string
        }
        Relationships: []
      }
      gm_challenge_runs: {
        Row: {
          ads_required: number
          created_at: string
          day: string
          id: string
          level: number
          reward: number
          updated_at: string
          user_id: number
        }
        Insert: {
          ads_required: number
          created_at?: string
          day?: string
          id?: string
          level: number
          reward: number
          updated_at?: string
          user_id: number
        }
        Update: {
          ads_required?: number
          created_at?: string
          day?: string
          id?: string
          level?: number
          reward?: number
          updated_at?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "gm_challenge_runs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "gm_users"
            referencedColumns: ["id"]
          },
        ]
      }
      gm_gifts: {
        Row: {
          amount: number
          claimed_at: string | null
          created_at: string
          expires_at: string
          id: string
          user_id: number
        }
        Insert: {
          amount: number
          claimed_at?: string | null
          created_at?: string
          expires_at?: string
          id?: string
          user_id: number
        }
        Update: {
          amount?: number
          claimed_at?: string | null
          created_at?: string
          expires_at?: string
          id?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "gm_gifts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "gm_users"
            referencedColumns: ["id"]
          },
        ]
      }
      gm_kv: {
        Row: {
          key: string
          updated_at: string
          value: string
        }
        Insert: {
          key: string
          updated_at?: string
          value: string
        }
        Update: {
          key?: string
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      gm_payments: {
        Row: {
          amount_nano: number
          confirmed_at: string | null
          created_at: string
          expires_at: string
          id: string
          memo: string
          purpose: string
          sender: string | null
          server_id: number | null
          status: string
          tx_hash: string | null
          user_id: number
        }
        Insert: {
          amount_nano: number
          confirmed_at?: string | null
          created_at?: string
          expires_at?: string
          id?: string
          memo: string
          purpose: string
          sender?: string | null
          server_id?: number | null
          status?: string
          tx_hash?: string | null
          user_id: number
        }
        Update: {
          amount_nano?: number
          confirmed_at?: string | null
          created_at?: string
          expires_at?: string
          id?: string
          memo?: string
          purpose?: string
          sender?: string | null
          server_id?: number | null
          status?: string
          tx_hash?: string | null
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "gm_payments_server_id_fkey"
            columns: ["server_id"]
            isOneToOne: false
            referencedRelation: "gm_servers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gm_payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "gm_users"
            referencedColumns: ["id"]
          },
        ]
      }
      gm_posts: {
        Row: {
          caption: string | null
          created_at: string
          error: string | null
          message_id: number | null
          slot: string
          status: string
        }
        Insert: {
          caption?: string | null
          created_at?: string
          error?: string | null
          message_id?: number | null
          slot: string
          status?: string
        }
        Update: {
          caption?: string | null
          created_at?: string
          error?: string | null
          message_id?: number | null
          slot?: string
          status?: string
        }
        Relationships: []
      }
      gm_servers: {
        Row: {
          active: boolean
          daily_rate: number
          duration_days: number
          hue: number
          id: number
          image: string
          max_per_user: number
          name: string
          price: number
          tier: string
          unlock: string
          unlock_target: number
        }
        Insert: {
          active?: boolean
          daily_rate: number
          duration_days: number
          hue?: number
          id: number
          image: string
          max_per_user?: number
          name: string
          price?: number
          tier: string
          unlock?: string
          unlock_target?: number
        }
        Update: {
          active?: boolean
          daily_rate?: number
          duration_days?: number
          hue?: number
          id?: number
          image?: string
          max_per_user?: number
          name?: string
          price?: number
          tier?: string
          unlock?: string
          unlock_target?: number
        }
        Relationships: []
      }
      gm_staff: {
        Row: {
          added_by: number | null
          created_at: string
          username: string
        }
        Insert: {
          added_by?: number | null
          created_at?: string
          username: string
        }
        Update: {
          added_by?: number | null
          created_at?: string
          username?: string
        }
        Relationships: []
      }
      gm_task_done: {
        Row: {
          completed_at: string | null
          started_at: string
          task_id: string
          user_id: number
        }
        Insert: {
          completed_at?: string | null
          started_at?: string
          task_id: string
          user_id: number
        }
        Update: {
          completed_at?: string | null
          started_at?: string
          task_id?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "gm_task_done_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "gm_tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gm_task_done_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "gm_users"
            referencedColumns: ["id"]
          },
        ]
      }
      gm_tasks: {
        Row: {
          active: boolean
          chat_id: string | null
          created_at: string
          created_by: number | null
          description: string | null
          id: string
          kind: string
          required: number
          reward: number
          sort: number
          title: string
          updated_at: string
          url: string | null
        }
        Insert: {
          active?: boolean
          chat_id?: string | null
          created_at?: string
          created_by?: number | null
          description?: string | null
          id?: string
          kind: string
          required?: number
          reward?: number
          sort?: number
          title: string
          updated_at?: string
          url?: string | null
        }
        Update: {
          active?: boolean
          chat_id?: string | null
          created_at?: string
          created_by?: number | null
          description?: string | null
          id?: string
          kind?: string
          required?: number
          reward?: number
          sort?: number
          title?: string
          updated_at?: string
          url?: string | null
        }
        Relationships: []
      }
      gm_user_servers: {
        Row: {
          daily_rate: number
          expires_at: string
          id: string
          server_id: number
          source: string
          started_at: string
          user_id: number
        }
        Insert: {
          daily_rate: number
          expires_at: string
          id?: string
          server_id: number
          source?: string
          started_at?: string
          user_id: number
        }
        Update: {
          daily_rate?: number
          expires_at?: string
          id?: string
          server_id?: number
          source?: string
          started_at?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "gm_user_servers_server_id_fkey"
            columns: ["server_id"]
            isOneToOne: false
            referencedRelation: "gm_servers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gm_user_servers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "gm_users"
            referencedColumns: ["id"]
          },
        ]
      }
      gm_users: {
        Row: {
          ads_day: string | null
          ads_today: number
          ads_total: number
          balance: number
          bot_blocked: boolean
          bot_started: boolean
          created_at: string
          first_name: string
          id: number
          language_code: string | null
          last_ad_at: string | null
          last_claim_at: string
          last_name: string | null
          last_seen_at: string
          photo_url: string | null
          referral_earnings: number
          referrals_count: number
          referrer_id: number | null
          total_deposited: number
          total_mined: number
          total_withdrawn: number
          username: string | null
          withdraw_unlocked: boolean
        }
        Insert: {
          ads_day?: string | null
          ads_today?: number
          ads_total?: number
          balance?: number
          bot_blocked?: boolean
          bot_started?: boolean
          created_at?: string
          first_name?: string
          id: number
          language_code?: string | null
          last_ad_at?: string | null
          last_claim_at?: string
          last_name?: string | null
          last_seen_at?: string
          photo_url?: string | null
          referral_earnings?: number
          referrals_count?: number
          referrer_id?: number | null
          total_deposited?: number
          total_mined?: number
          total_withdrawn?: number
          username?: string | null
          withdraw_unlocked?: boolean
        }
        Update: {
          ads_day?: string | null
          ads_today?: number
          ads_total?: number
          balance?: number
          bot_blocked?: boolean
          bot_started?: boolean
          created_at?: string
          first_name?: string
          id?: number
          language_code?: string | null
          last_ad_at?: string | null
          last_claim_at?: string
          last_name?: string | null
          last_seen_at?: string
          photo_url?: string | null
          referral_earnings?: number
          referrals_count?: number
          referrer_id?: number | null
          total_deposited?: number
          total_mined?: number
          total_withdrawn?: number
          username?: string | null
          withdraw_unlocked?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "gm_users_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "gm_users"
            referencedColumns: ["id"]
          },
        ]
      }
      gm_wallet_proofs: {
        Row: {
          amount_nano: number
          attempt_at: string | null
          chain_time: string
          created_at: string
          destination: string
          error: string | null
          message_hash: string
          status: string
          telegram_message_id: number | null
          transaction_hash: string
          updated_at: string
        }
        Insert: {
          amount_nano: number
          attempt_at?: string | null
          chain_time: string
          created_at?: string
          destination: string
          error?: string | null
          message_hash: string
          status?: string
          telegram_message_id?: number | null
          transaction_hash: string
          updated_at?: string
        }
        Update: {
          amount_nano?: number
          attempt_at?: string | null
          chain_time?: string
          created_at?: string
          destination?: string
          error?: string | null
          message_hash?: string
          status?: string
          telegram_message_id?: number | null
          transaction_hash?: string
          updated_at?: string
        }
        Relationships: []
      }
      gm_withdrawals: {
        Row: {
          address: string
          amount: number
          created_at: string
          id: string
          note: string | null
          processed_at: string | null
          processed_by: number | null
          proof_attempt_at: string | null
          proof_error: string | null
          proof_message_id: number | null
          proof_status: string
          status: string
          tx_hash: string | null
          user_id: number
        }
        Insert: {
          address: string
          amount: number
          created_at?: string
          id?: string
          note?: string | null
          processed_at?: string | null
          processed_by?: number | null
          proof_attempt_at?: string | null
          proof_error?: string | null
          proof_message_id?: number | null
          proof_status?: string
          status?: string
          tx_hash?: string | null
          user_id: number
        }
        Update: {
          address?: string
          amount?: number
          created_at?: string
          id?: string
          note?: string | null
          processed_at?: string | null
          processed_by?: number | null
          proof_attempt_at?: string | null
          proof_error?: string | null
          proof_message_id?: number | null
          proof_status?: string
          status?: string
          tx_hash?: string | null
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "gm_withdrawals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "gm_users"
            referencedColumns: ["id"]
          },
        ]
      }
      hm27_ad_views: {
        Row: {
          created_at: string
          id: string
          reward: number
          tg_id: number
        }
        Insert: {
          created_at?: string
          id?: string
          reward?: number
          tg_id: number
        }
        Update: {
          created_at?: string
          id?: string
          reward?: number
          tg_id?: number
        }
        Relationships: []
      }
      hm27_game_plays: {
        Row: {
          created_at: string
          game: string
          id: string
          reward: number
          tg_id: number
        }
        Insert: {
          created_at?: string
          game: string
          id?: string
          reward: number
          tg_id: number
        }
        Update: {
          created_at?: string
          game?: string
          id?: string
          reward?: number
          tg_id?: number
        }
        Relationships: []
      }
      hm27_gifts: {
        Row: {
          amount: number
          claimed: boolean
          created_at: string
          id: string
          tg_id: number
        }
        Insert: {
          amount: number
          claimed?: boolean
          created_at?: string
          id?: string
          tg_id: number
        }
        Update: {
          amount?: number
          claimed?: boolean
          created_at?: string
          id?: string
          tg_id?: number
        }
        Relationships: []
      }
      hm27_payments: {
        Row: {
          amount: number
          created_at: string
          id: string
          memo: string
          server_id: string
          status: string
          tg_id: number
          tx_hash: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          memo: string
          server_id: string
          status?: string
          tg_id: number
          tx_hash?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          memo?: string
          server_id?: string
          status?: string
          tg_id?: number
          tx_hash?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      hm27_roles: {
        Row: {
          created_at: string
          id: string
          role: string
          username: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: string
          username: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: string
          username?: string
        }
        Relationships: []
      }
      hm27_servers: {
        Row: {
          id: string
          image: string
          name: string
          price_ton: number
          rate: number
          sort: number
        }
        Insert: {
          id: string
          image: string
          name: string
          price_ton: number
          rate: number
          sort?: number
        }
        Update: {
          id?: string
          image?: string
          name?: string
          price_ton?: number
          rate?: number
          sort?: number
        }
        Relationships: []
      }
      hm27_task_done: {
        Row: {
          created_at: string
          task_id: string
          tg_id: number
        }
        Insert: {
          created_at?: string
          task_id: string
          tg_id: number
        }
        Update: {
          created_at?: string
          task_id?: string
          tg_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "hm27_task_done_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "hm27_tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      hm27_tasks: {
        Row: {
          active: boolean
          created_at: string
          id: string
          kind: string
          reward: number
          sort: number
          target: number
          title: string
          updated_at: string
          url: string | null
        }
        Insert: {
          active?: boolean
          created_at?: string
          id?: string
          kind?: string
          reward?: number
          sort?: number
          target?: number
          title: string
          updated_at?: string
          url?: string | null
        }
        Update: {
          active?: boolean
          created_at?: string
          id?: string
          kind?: string
          reward?: number
          sort?: number
          target?: number
          title?: string
          updated_at?: string
          url?: string | null
        }
        Relationships: []
      }
      hm27_user_servers: {
        Row: {
          created_at: string
          id: string
          server_id: string
          tg_id: number
        }
        Insert: {
          created_at?: string
          id?: string
          server_id: string
          tg_id: number
        }
        Update: {
          created_at?: string
          id?: string
          server_id?: string
          tg_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "hm27_user_servers_server_id_fkey"
            columns: ["server_id"]
            isOneToOne: false
            referencedRelation: "hm27_servers"
            referencedColumns: ["id"]
          },
        ]
      }
      hm27_users: {
        Row: {
          balance: number
          base_rate: number
          created_at: string
          first_name: string | null
          last_checkin: string | null
          mining_started_at: string | null
          ref_count: number
          referrer_id: number | null
          tg_id: number
          updated_at: string
          username: string | null
        }
        Insert: {
          balance?: number
          base_rate?: number
          created_at?: string
          first_name?: string | null
          last_checkin?: string | null
          mining_started_at?: string | null
          ref_count?: number
          referrer_id?: number | null
          tg_id: number
          updated_at?: string
          username?: string | null
        }
        Update: {
          balance?: number
          base_rate?: number
          created_at?: string
          first_name?: string | null
          last_checkin?: string | null
          mining_started_at?: string | null
          ref_count?: number
          referrer_id?: number | null
          tg_id?: number
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      hm27_withdrawals: {
        Row: {
          amount: number
          created_at: string
          id: string
          status: string
          tg_id: number
          updated_at: string
          wallet: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          status?: string
          tg_id: number
          updated_at?: string
          wallet: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          status?: string
          tg_id?: number
          updated_at?: string
          wallet?: string
        }
        Relationships: []
      }
      job_runs: {
        Row: {
          created_at: string
          cursor_id: number
          done: boolean
          key: string
          sent: number
        }
        Insert: {
          created_at?: string
          cursor_id?: number
          done?: boolean
          key: string
          sent?: number
        }
        Update: {
          created_at?: string
          cursor_id?: number
          done?: boolean
          key?: string
          sent?: number
        }
        Relationships: []
      }
      lumen_gift_claims: {
        Row: {
          created_at: string
          gift_id: string
          tg_id: number
        }
        Insert: {
          created_at?: string
          gift_id: string
          tg_id: number
        }
        Update: {
          created_at?: string
          gift_id?: string
          tg_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "lumen_gift_claims_gift_id_fkey"
            columns: ["gift_id"]
            isOneToOne: false
            referencedRelation: "lumen_gifts"
            referencedColumns: ["id"]
          },
        ]
      }
      lumen_gifts: {
        Row: {
          amount: number
          created_at: string
          id: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
        }
        Relationships: []
      }
      lumen_jobs: {
        Row: {
          cursor: number
          last_run: string
          name: string
        }
        Insert: {
          cursor?: number
          last_run?: string
          name: string
        }
        Update: {
          cursor?: number
          last_run?: string
          name?: string
        }
        Relationships: []
      }
      lumen_payments: {
        Row: {
          amount_ton: number
          comment: string
          created_at: string
          id: string
          server_id: string | null
          status: string
          tg_id: number
          tx_hash: string | null
        }
        Insert: {
          amount_ton: number
          comment: string
          created_at?: string
          id?: string
          server_id?: string | null
          status?: string
          tg_id: number
          tx_hash?: string | null
        }
        Update: {
          amount_ton?: number
          comment?: string
          created_at?: string
          id?: string
          server_id?: string | null
          status?: string
          tg_id?: number
          tx_hash?: string | null
        }
        Relationships: []
      }
      lumen_servers: {
        Row: {
          id: string
          image: string
          name: string
          price_ton: number
          rate_boost: number
          sort: number
        }
        Insert: {
          id?: string
          image: string
          name: string
          price_ton: number
          rate_boost: number
          sort?: number
        }
        Update: {
          id?: string
          image?: string
          name?: string
          price_ton?: number
          rate_boost?: number
          sort?: number
        }
        Relationships: []
      }
      lumen_task_admins: {
        Row: {
          created_at: string
          username: string
        }
        Insert: {
          created_at?: string
          username: string
        }
        Update: {
          created_at?: string
          username?: string
        }
        Relationships: []
      }
      lumen_task_done: {
        Row: {
          created_at: string
          task_id: string
          tg_id: number
        }
        Insert: {
          created_at?: string
          task_id: string
          tg_id: number
        }
        Update: {
          created_at?: string
          task_id?: string
          tg_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "lumen_task_done_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "lumen_tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      lumen_tasks: {
        Row: {
          active: boolean
          created_at: string
          id: string
          kind: string
          reward: number
          target: number
          title: string
          url: string | null
        }
        Insert: {
          active?: boolean
          created_at?: string
          id?: string
          kind?: string
          reward?: number
          target?: number
          title: string
          url?: string | null
        }
        Update: {
          active?: boolean
          created_at?: string
          id?: string
          kind?: string
          reward?: number
          target?: number
          title?: string
          url?: string | null
        }
        Relationships: []
      }
      lumen_user_servers: {
        Row: {
          created_at: string
          id: string
          server_id: string
          tg_id: number
        }
        Insert: {
          created_at?: string
          id?: string
          server_id: string
          tg_id: number
        }
        Update: {
          created_at?: string
          id?: string
          server_id?: string
          tg_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "lumen_user_servers_server_id_fkey"
            columns: ["server_id"]
            isOneToOne: false
            referencedRelation: "lumen_servers"
            referencedColumns: ["id"]
          },
        ]
      }
      lumen_users: {
        Row: {
          balance: number
          base_rate: number
          created_at: string
          first_name: string | null
          games_played: number
          last_game_at: string | null
          last_task_ad_at: string | null
          mining_ends_at: string | null
          mining_started_at: string | null
          notified_on: string | null
          photo_url: string | null
          ref_count: number
          referrer_id: number | null
          tg_id: number
          username: string | null
        }
        Insert: {
          balance?: number
          base_rate?: number
          created_at?: string
          first_name?: string | null
          games_played?: number
          last_game_at?: string | null
          last_task_ad_at?: string | null
          mining_ends_at?: string | null
          mining_started_at?: string | null
          notified_on?: string | null
          photo_url?: string | null
          ref_count?: number
          referrer_id?: number | null
          tg_id: number
          username?: string | null
        }
        Update: {
          balance?: number
          base_rate?: number
          created_at?: string
          first_name?: string | null
          games_played?: number
          last_game_at?: string | null
          last_task_ad_at?: string | null
          mining_ends_at?: string | null
          mining_started_at?: string | null
          notified_on?: string | null
          photo_url?: string | null
          ref_count?: number
          referrer_id?: number | null
          tg_id?: number
          username?: string | null
        }
        Relationships: []
      }
      lumen_withdrawals: {
        Row: {
          address: string
          amount: number
          created_at: string
          id: string
          status: string
          tg_id: number
        }
        Insert: {
          address: string
          amount: number
          created_at?: string
          id?: string
          status?: string
          tg_id: number
        }
        Update: {
          address?: string
          amount?: number
          created_at?: string
          id?: string
          status?: string
          tg_id?: number
        }
        Relationships: []
      }
      news_posts: {
        Row: {
          body: string
          created_at: string
          id: number
        }
        Insert: {
          body: string
          created_at?: string
          id?: number
        }
        Update: {
          body?: string
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      notm_gifts: {
        Row: {
          amount: number
          claimed: boolean
          created_at: string
          id: string
          user_id: number
        }
        Insert: {
          amount: number
          claimed?: boolean
          created_at?: string
          id?: string
          user_id: number
        }
        Update: {
          amount?: number
          claimed?: boolean
          created_at?: string
          id?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "notm_gifts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "notm_users"
            referencedColumns: ["id"]
          },
        ]
      }
      notm_payments: {
        Row: {
          amount_ton: number
          created_at: string
          id: string
          memo: string
          purpose: string
          status: string
          tx_hash: string | null
          user_id: number
        }
        Insert: {
          amount_ton: number
          created_at?: string
          id?: string
          memo: string
          purpose: string
          status?: string
          tx_hash?: string | null
          user_id: number
        }
        Update: {
          amount_ton?: number
          created_at?: string
          id?: string
          memo?: string
          purpose?: string
          status?: string
          tx_hash?: string | null
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "notm_payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "notm_users"
            referencedColumns: ["id"]
          },
        ]
      }
      notm_settings: {
        Row: {
          key: string
          value: string
        }
        Insert: {
          key: string
          value: string
        }
        Update: {
          key?: string
          value?: string
        }
        Relationships: []
      }
      notm_task_done: {
        Row: {
          created_at: string
          task_id: string
          user_id: number
        }
        Insert: {
          created_at?: string
          task_id: string
          user_id: number
        }
        Update: {
          created_at?: string
          task_id?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "notm_task_done_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "notm_tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notm_task_done_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "notm_users"
            referencedColumns: ["id"]
          },
        ]
      }
      notm_task_managers: {
        Row: {
          created_at: string
          username: string
        }
        Insert: {
          created_at?: string
          username: string
        }
        Update: {
          created_at?: string
          username?: string
        }
        Relationships: []
      }
      notm_tasks: {
        Row: {
          active: boolean
          created_at: string
          id: string
          kind: string
          reward: number
          sort: number
          target: number
          title: string
          url: string | null
        }
        Insert: {
          active?: boolean
          created_at?: string
          id?: string
          kind?: string
          reward?: number
          sort?: number
          target?: number
          title: string
          url?: string | null
        }
        Update: {
          active?: boolean
          created_at?: string
          id?: string
          kind?: string
          reward?: number
          sort?: number
          target?: number
          title?: string
          url?: string | null
        }
        Relationships: []
      }
      notm_user_servers: {
        Row: {
          created_at: string
          id: string
          server_id: string
          user_id: number
        }
        Insert: {
          created_at?: string
          id?: string
          server_id: string
          user_id: number
        }
        Update: {
          created_at?: string
          id?: string
          server_id?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "notm_user_servers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "notm_users"
            referencedColumns: ["id"]
          },
        ]
      }
      notm_users: {
        Row: {
          ads_watched: number
          balance: number
          blocked: boolean
          created_at: string
          first_name: string | null
          id: number
          joined_community: boolean
          last_checkin: string | null
          last_game_at: string | null
          mining_started_at: string | null
          paid_gram: boolean
          photo_url: string | null
          ref_count: number
          referrer_id: number | null
          username: string | null
        }
        Insert: {
          ads_watched?: number
          balance?: number
          blocked?: boolean
          created_at?: string
          first_name?: string | null
          id: number
          joined_community?: boolean
          last_checkin?: string | null
          last_game_at?: string | null
          mining_started_at?: string | null
          paid_gram?: boolean
          photo_url?: string | null
          ref_count?: number
          referrer_id?: number | null
          username?: string | null
        }
        Update: {
          ads_watched?: number
          balance?: number
          blocked?: boolean
          created_at?: string
          first_name?: string | null
          id?: number
          joined_community?: boolean
          last_checkin?: string | null
          last_game_at?: string | null
          mining_started_at?: string | null
          paid_gram?: boolean
          photo_url?: string | null
          ref_count?: number
          referrer_id?: number | null
          username?: string | null
        }
        Relationships: []
      }
      notm_withdrawals: {
        Row: {
          amount: number
          created_at: string
          id: string
          status: string
          user_id: number
          wallet: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          status?: string
          user_id: number
          wallet: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          status?: string
          user_id?: number
          wallet?: string
        }
        Relationships: [
          {
            foreignKeyName: "notm_withdrawals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "notm_users"
            referencedColumns: ["id"]
          },
        ]
      }
      orai_ad_views: {
        Row: {
          consumed: boolean
          created_at: string
          id: number
          kind: string
          telegram_id: number
        }
        Insert: {
          consumed?: boolean
          created_at?: string
          id?: number
          kind: string
          telegram_id: number
        }
        Update: {
          consumed?: boolean
          created_at?: string
          id?: number
          kind?: string
          telegram_id?: number
        }
        Relationships: []
      }
      orai_admins: {
        Row: {
          added_by: string | null
          created_at: string
          role: string
          username: string
        }
        Insert: {
          added_by?: string | null
          created_at?: string
          role?: string
          username: string
        }
        Update: {
          added_by?: string | null
          created_at?: string
          role?: string
          username?: string
        }
        Relationships: []
      }
      orai_broadcasts: {
        Row: {
          created_at: string
          cursor_id: number
          failed: number
          finished_at: string | null
          id: string
          kind: string
          payload: Json
          sent: number
          status: string
        }
        Insert: {
          created_at?: string
          cursor_id?: number
          failed?: number
          finished_at?: string | null
          id?: string
          kind: string
          payload?: Json
          sent?: number
          status?: string
        }
        Update: {
          created_at?: string
          cursor_id?: number
          failed?: number
          finished_at?: string | null
          id?: string
          kind?: string
          payload?: Json
          sent?: number
          status?: string
        }
        Relationships: []
      }
      orai_game_sessions: {
        Row: {
          finished_at: string | null
          game: string
          id: string
          reward: number | null
          score: number | null
          started_at: string
          telegram_id: number
        }
        Insert: {
          finished_at?: string | null
          game: string
          id?: string
          reward?: number | null
          score?: number | null
          started_at?: string
          telegram_id: number
        }
        Update: {
          finished_at?: string | null
          game?: string
          id?: string
          reward?: number | null
          score?: number | null
          started_at?: string
          telegram_id?: number
        }
        Relationships: []
      }
      orai_gift_campaigns: {
        Row: {
          amount: number
          created_at: string
          expires_at: string
          id: string
          title: string
        }
        Insert: {
          amount: number
          created_at?: string
          expires_at?: string
          id?: string
          title?: string
        }
        Update: {
          amount?: number
          created_at?: string
          expires_at?: string
          id?: string
          title?: string
        }
        Relationships: []
      }
      orai_gift_claims: {
        Row: {
          campaign_id: string
          claimed_at: string
          telegram_id: number
        }
        Insert: {
          campaign_id: string
          claimed_at?: string
          telegram_id: number
        }
        Update: {
          campaign_id?: string
          claimed_at?: string
          telegram_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "orai_gift_claims_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "orai_gift_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      orai_jobs: {
        Row: {
          last_key: string | null
          locked_until: string | null
          name: string
          updated_at: string
        }
        Insert: {
          last_key?: string | null
          locked_until?: string | null
          name: string
          updated_at?: string
        }
        Update: {
          last_key?: string | null
          locked_until?: string | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      orai_news: {
        Row: {
          body: string | null
          created_at: string
          error: string | null
          id: string
          message_id: number | null
          slot: string | null
          status: string
          title: string | null
        }
        Insert: {
          body?: string | null
          created_at?: string
          error?: string | null
          id?: string
          message_id?: number | null
          slot?: string | null
          status?: string
          title?: string | null
        }
        Update: {
          body?: string | null
          created_at?: string
          error?: string | null
          id?: string
          message_id?: number | null
          slot?: string | null
          status?: string
          title?: string | null
        }
        Relationships: []
      }
      orai_payments: {
        Row: {
          action: string
          amount_nano: number
          confirmed_at: string | null
          created_at: string
          expires_at: string
          id: string
          memo: string
          ref_id: string | null
          status: string
          telegram_id: number
          tx_hash: string | null
        }
        Insert: {
          action: string
          amount_nano: number
          confirmed_at?: string | null
          created_at?: string
          expires_at?: string
          id?: string
          memo: string
          ref_id?: string | null
          status?: string
          telegram_id: number
          tx_hash?: string | null
        }
        Update: {
          action?: string
          amount_nano?: number
          confirmed_at?: string | null
          created_at?: string
          expires_at?: string
          id?: string
          memo?: string
          ref_id?: string | null
          status?: string
          telegram_id?: number
          tx_hash?: string | null
        }
        Relationships: []
      }
      orai_server_ad_progress: {
        Row: {
          ads: number
          server_id: string
          telegram_id: number
          updated_at: string
        }
        Insert: {
          ads?: number
          server_id: string
          telegram_id: number
          updated_at?: string
        }
        Update: {
          ads?: number
          server_id?: string
          telegram_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orai_server_ad_progress_server_id_fkey"
            columns: ["server_id"]
            isOneToOne: false
            referencedRelation: "orai_servers"
            referencedColumns: ["id"]
          },
        ]
      }
      orai_servers: {
        Row: {
          active: boolean
          ads_required: number | null
          created_at: string
          duration_days: number
          id: string
          name: string
          price_ton: number
          rate_boost: number
          slug: string
          sort: number
          tagline: string
        }
        Insert: {
          active?: boolean
          ads_required?: number | null
          created_at?: string
          duration_days?: number
          id?: string
          name: string
          price_ton: number
          rate_boost: number
          slug: string
          sort?: number
          tagline?: string
        }
        Update: {
          active?: boolean
          ads_required?: number | null
          created_at?: string
          duration_days?: number
          id?: string
          name?: string
          price_ton?: number
          rate_boost?: number
          slug?: string
          sort?: number
          tagline?: string
        }
        Relationships: []
      }
      orai_settings: {
        Row: {
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          key: string
          updated_at?: string
          value: Json
        }
        Update: {
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      orai_task_claims: {
        Row: {
          completed_at: string | null
          started_at: string
          task_id: string
          telegram_id: number
        }
        Insert: {
          completed_at?: string | null
          started_at?: string
          task_id: string
          telegram_id: number
        }
        Update: {
          completed_at?: string | null
          started_at?: string
          task_id?: string
          telegram_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "orai_task_claims_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "orai_tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      orai_tasks: {
        Row: {
          active: boolean
          chat_id: string | null
          created_at: string
          created_by: string | null
          description: string
          icon: string
          id: string
          kind: string
          reward: number
          reward_server_id: string | null
          sort: number
          target: number
          title: string
          updated_at: string
          url: string | null
        }
        Insert: {
          active?: boolean
          chat_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string
          icon?: string
          id?: string
          kind?: string
          reward?: number
          reward_server_id?: string | null
          sort?: number
          target?: number
          title: string
          updated_at?: string
          url?: string | null
        }
        Update: {
          active?: boolean
          chat_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string
          icon?: string
          id?: string
          kind?: string
          reward?: number
          reward_server_id?: string | null
          sort?: number
          target?: number
          title?: string
          updated_at?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orai_tasks_reward_server_id_fkey"
            columns: ["reward_server_id"]
            isOneToOne: false
            referencedRelation: "orai_servers"
            referencedColumns: ["id"]
          },
        ]
      }
      orai_user_servers: {
        Row: {
          expires_at: string
          id: string
          payment_id: string | null
          purchased_at: string
          server_id: string
          telegram_id: number
        }
        Insert: {
          expires_at: string
          id?: string
          payment_id?: string | null
          purchased_at?: string
          server_id: string
          telegram_id: number
        }
        Update: {
          expires_at?: string
          id?: string
          payment_id?: string | null
          purchased_at?: string
          server_id?: string
          telegram_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "orai_user_servers_server_id_fkey"
            columns: ["server_id"]
            isOneToOne: false
            referencedRelation: "orai_servers"
            referencedColumns: ["id"]
          },
        ]
      }
      orai_users: {
        Row: {
          ads_day: string | null
          ads_today: number
          ads_total: number
          balance: number
          bot_blocked: boolean
          bot_started: boolean
          created_at: string
          first_name: string | null
          language_code: string | null
          last_name: string | null
          last_seen_at: string
          mine_accrued: number
          mine_boosts: number
          mine_ends_at: string | null
          mine_rate: number
          mine_segment_at: string | null
          mine_started_at: string | null
          photo_url: string | null
          referrals_count: number
          referrer_id: number | null
          telegram_id: number
          total_mined: number
          total_withdrawn: number
          username: string | null
          withdraw_unlocked: boolean
        }
        Insert: {
          ads_day?: string | null
          ads_today?: number
          ads_total?: number
          balance?: number
          bot_blocked?: boolean
          bot_started?: boolean
          created_at?: string
          first_name?: string | null
          language_code?: string | null
          last_name?: string | null
          last_seen_at?: string
          mine_accrued?: number
          mine_boosts?: number
          mine_ends_at?: string | null
          mine_rate?: number
          mine_segment_at?: string | null
          mine_started_at?: string | null
          photo_url?: string | null
          referrals_count?: number
          referrer_id?: number | null
          telegram_id: number
          total_mined?: number
          total_withdrawn?: number
          username?: string | null
          withdraw_unlocked?: boolean
        }
        Update: {
          ads_day?: string | null
          ads_today?: number
          ads_total?: number
          balance?: number
          bot_blocked?: boolean
          bot_started?: boolean
          created_at?: string
          first_name?: string | null
          language_code?: string | null
          last_name?: string | null
          last_seen_at?: string
          mine_accrued?: number
          mine_boosts?: number
          mine_ends_at?: string | null
          mine_rate?: number
          mine_segment_at?: string | null
          mine_started_at?: string | null
          photo_url?: string | null
          referrals_count?: number
          referrer_id?: number | null
          telegram_id?: number
          total_mined?: number
          total_withdrawn?: number
          username?: string | null
          withdraw_unlocked?: boolean
        }
        Relationships: []
      }
      orai_withdrawals: {
        Row: {
          address: string
          amount: number
          attempts: number
          created_at: string
          error: string | null
          id: string
          processed_at: string | null
          seqno: number | null
          status: string
          telegram_id: number
        }
        Insert: {
          address: string
          amount: number
          attempts?: number
          created_at?: string
          error?: string | null
          id?: string
          processed_at?: string | null
          seqno?: number | null
          status?: string
          telegram_id: number
        }
        Update: {
          address?: string
          amount?: number
          attempts?: number
          created_at?: string
          error?: string | null
          id?: string
          processed_at?: string | null
          seqno?: number | null
          status?: string
          telegram_id?: number
        }
        Relationships: []
      }
      orange_ad_views: {
        Row: {
          created_at: string
          id: number
          purpose: string
          used: boolean
          user_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          purpose: string
          used?: boolean
          user_id: number
        }
        Update: {
          created_at?: string
          id?: number
          purpose?: string
          used?: boolean
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "orange_ad_views_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "orange_users"
            referencedColumns: ["tg_id"]
          },
        ]
      }
      orange_admins: {
        Row: {
          added_by: string | null
          created_at: string
          role: string
          username: string
        }
        Insert: {
          added_by?: string | null
          created_at?: string
          role?: string
          username: string
        }
        Update: {
          added_by?: string | null
          created_at?: string
          role?: string
          username?: string
        }
        Relationships: []
      }
      orange_game_sessions: {
        Row: {
          doubled: boolean
          finished: boolean
          game: string
          id: string
          reward: number
          score: number
          started_at: string
          user_id: number
        }
        Insert: {
          doubled?: boolean
          finished?: boolean
          game: string
          id?: string
          reward?: number
          score?: number
          started_at?: string
          user_id: number
        }
        Update: {
          doubled?: boolean
          finished?: boolean
          game?: string
          id?: string
          reward?: number
          score?: number
          started_at?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "orange_game_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "orange_users"
            referencedColumns: ["tg_id"]
          },
        ]
      }
      orange_gifts: {
        Row: {
          amount: number
          claimed: boolean
          claimed_at: string | null
          created_at: string
          expires_at: string
          id: string
          user_id: number
        }
        Insert: {
          amount: number
          claimed?: boolean
          claimed_at?: string | null
          created_at?: string
          expires_at?: string
          id?: string
          user_id: number
        }
        Update: {
          amount?: number
          claimed?: boolean
          claimed_at?: string | null
          created_at?: string
          expires_at?: string
          id?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "orange_gifts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "orange_users"
            referencedColumns: ["tg_id"]
          },
        ]
      }
      orange_jobs: {
        Row: {
          created_at: string
          cursor_id: number
          done: boolean
          key: string
          kind: string
          sent: number
        }
        Insert: {
          created_at?: string
          cursor_id?: number
          done?: boolean
          key: string
          kind: string
          sent?: number
        }
        Update: {
          created_at?: string
          cursor_id?: number
          done?: boolean
          key?: string
          kind?: string
          sent?: number
        }
        Relationships: []
      }
      orange_news: {
        Row: {
          body: string
          created_at: string
          id: number
        }
        Insert: {
          body: string
          created_at?: string
          id?: number
        }
        Update: {
          body?: string
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      orange_payments: {
        Row: {
          amount_nano: number
          confirmed_at: string | null
          created_at: string
          id: string
          kind: string
          memo: string
          ref_id: string | null
          status: string
          tx_hash: string | null
          user_id: number
        }
        Insert: {
          amount_nano: number
          confirmed_at?: string | null
          created_at?: string
          id?: string
          kind?: string
          memo: string
          ref_id?: string | null
          status?: string
          tx_hash?: string | null
          user_id: number
        }
        Update: {
          amount_nano?: number
          confirmed_at?: string | null
          created_at?: string
          id?: string
          kind?: string
          memo?: string
          ref_id?: string | null
          status?: string
          tx_hash?: string | null
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "orange_payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "orange_users"
            referencedColumns: ["tg_id"]
          },
        ]
      }
      orange_servers: {
        Row: {
          active: boolean
          color: string
          duration_days: number
          id: string
          name: string
          price_ton: number
          rate_per_hour: number
          sort: number
          tier: number
        }
        Insert: {
          active?: boolean
          color?: string
          duration_days?: number
          id: string
          name: string
          price_ton: number
          rate_per_hour: number
          sort?: number
          tier?: number
        }
        Update: {
          active?: boolean
          color?: string
          duration_days?: number
          id?: string
          name?: string
          price_ton?: number
          rate_per_hour?: number
          sort?: number
          tier?: number
        }
        Relationships: []
      }
      orange_task_claims: {
        Row: {
          created_at: string
          task_id: string
          user_id: number
        }
        Insert: {
          created_at?: string
          task_id: string
          user_id: number
        }
        Update: {
          created_at?: string
          task_id?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "orange_task_claims_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "orange_tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orange_task_claims_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "orange_users"
            referencedColumns: ["tg_id"]
          },
        ]
      }
      orange_tasks: {
        Row: {
          active: boolean
          chat_id: string | null
          created_at: string
          created_by: string | null
          description: string | null
          icon: string
          id: string
          kind: string
          reward: number
          sort: number
          target: number
          title: string
          url: string | null
        }
        Insert: {
          active?: boolean
          chat_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          icon?: string
          id?: string
          kind?: string
          reward?: number
          sort?: number
          target?: number
          title: string
          url?: string | null
        }
        Update: {
          active?: boolean
          chat_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          icon?: string
          id?: string
          kind?: string
          reward?: number
          sort?: number
          target?: number
          title?: string
          url?: string | null
        }
        Relationships: []
      }
      orange_user_servers: {
        Row: {
          created_at: string
          expires_at: string
          id: string
          rate_per_hour: number
          server_id: string
          user_id: number
        }
        Insert: {
          created_at?: string
          expires_at: string
          id?: string
          rate_per_hour: number
          server_id: string
          user_id: number
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: string
          rate_per_hour?: number
          server_id?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "orange_user_servers_server_id_fkey"
            columns: ["server_id"]
            isOneToOne: false
            referencedRelation: "orange_servers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orange_user_servers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "orange_users"
            referencedColumns: ["tg_id"]
          },
        ]
      }
      orange_users: {
        Row: {
          ads_date: string | null
          ads_today: number
          ads_total: number
          balance: number
          boost_until: string | null
          bot_blocked: boolean
          created_at: string
          daily_last: string | null
          daily_streak: number
          first_name: string | null
          games_date: string | null
          games_today: number
          last_ad_at: string | null
          last_seen: string
          mining_last_tick: string | null
          mining_pending: number
          mining_rate: number
          mining_started_at: string | null
          photo_url: string | null
          ref_count: number
          ref_earned: number
          referrer_id: number | null
          started_bot: boolean
          tg_id: number
          total_mined: number
          username: string | null
        }
        Insert: {
          ads_date?: string | null
          ads_today?: number
          ads_total?: number
          balance?: number
          boost_until?: string | null
          bot_blocked?: boolean
          created_at?: string
          daily_last?: string | null
          daily_streak?: number
          first_name?: string | null
          games_date?: string | null
          games_today?: number
          last_ad_at?: string | null
          last_seen?: string
          mining_last_tick?: string | null
          mining_pending?: number
          mining_rate?: number
          mining_started_at?: string | null
          photo_url?: string | null
          ref_count?: number
          ref_earned?: number
          referrer_id?: number | null
          started_bot?: boolean
          tg_id: number
          total_mined?: number
          username?: string | null
        }
        Update: {
          ads_date?: string | null
          ads_today?: number
          ads_total?: number
          balance?: number
          boost_until?: string | null
          bot_blocked?: boolean
          created_at?: string
          daily_last?: string | null
          daily_streak?: number
          first_name?: string | null
          games_date?: string | null
          games_today?: number
          last_ad_at?: string | null
          last_seen?: string
          mining_last_tick?: string | null
          mining_pending?: number
          mining_rate?: number
          mining_started_at?: string | null
          photo_url?: string | null
          ref_count?: number
          ref_earned?: number
          referrer_id?: number | null
          started_bot?: boolean
          tg_id?: number
          total_mined?: number
          username?: string | null
        }
        Relationships: []
      }
      orange_wallet_confirmations: {
        Row: {
          address: string
          confirmed_at: string
          payment_id: string
          user_id: number
        }
        Insert: {
          address: string
          confirmed_at?: string
          payment_id: string
          user_id: number
        }
        Update: {
          address?: string
          confirmed_at?: string
          payment_id?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "orange_wallet_confirmations_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: true
            referencedRelation: "orange_payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orange_wallet_confirmations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "orange_users"
            referencedColumns: ["tg_id"]
          },
        ]
      }
      orange_withdrawals: {
        Row: {
          address: string
          amount: number
          created_at: string
          id: string
          note: string | null
          processed_at: string | null
          status: string
          user_id: number
        }
        Insert: {
          address: string
          amount: number
          created_at?: string
          id?: string
          note?: string | null
          processed_at?: string | null
          status?: string
          user_id: number
        }
        Update: {
          address?: string
          amount?: number
          created_at?: string
          id?: string
          note?: string | null
          processed_at?: string | null
          status?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "orange_withdrawals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "orange_users"
            referencedColumns: ["tg_id"]
          },
        ]
      }
      payments: {
        Row: {
          amount_ton: number
          confirmed_at: string | null
          created_at: string
          id: string
          memo: string
          server_id: string | null
          status: string
          tx_hash: string | null
          user_id: number
        }
        Insert: {
          amount_ton: number
          confirmed_at?: string | null
          created_at?: string
          id?: string
          memo: string
          server_id?: string | null
          status?: string
          tx_hash?: string | null
          user_id: number
        }
        Update: {
          amount_ton?: number
          confirmed_at?: string | null
          created_at?: string
          id?: string
          memo?: string
          server_id?: string | null
          status?: string
          tx_hash?: string | null
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "payments_server_id_fkey"
            columns: ["server_id"]
            isOneToOne: false
            referencedRelation: "servers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["tg_id"]
          },
        ]
      }
      servers: {
        Row: {
          active: boolean
          duration_days: number
          id: string
          image: string
          max_supply: number | null
          name: string
          price_ton: number
          rate_per_hour: number
          sort: number
          tier: number
        }
        Insert: {
          active?: boolean
          duration_days?: number
          id?: string
          image?: string
          max_supply?: number | null
          name: string
          price_ton: number
          rate_per_hour: number
          sort?: number
          tier?: number
        }
        Update: {
          active?: boolean
          duration_days?: number
          id?: string
          image?: string
          max_supply?: number | null
          name?: string
          price_ton?: number
          rate_per_hour?: number
          sort?: number
          tier?: number
        }
        Relationships: []
      }
      task_completions: {
        Row: {
          created_at: string
          task_id: string
          user_id: number
        }
        Insert: {
          created_at?: string
          task_id: string
          user_id: number
        }
        Update: {
          created_at?: string
          task_id?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "task_completions_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_completions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["tg_id"]
          },
        ]
      }
      tasks: {
        Row: {
          active: boolean
          chat_id: string | null
          created_at: string
          description: string | null
          icon: string
          id: string
          image: string | null
          kind: string
          reward: number
          sort: number
          target: number
          title: string
          url: string | null
        }
        Insert: {
          active?: boolean
          chat_id?: string | null
          created_at?: string
          description?: string | null
          icon?: string
          id?: string
          image?: string | null
          kind?: string
          reward?: number
          sort?: number
          target?: number
          title: string
          url?: string | null
        }
        Update: {
          active?: boolean
          chat_id?: string | null
          created_at?: string
          description?: string | null
          icon?: string
          id?: string
          image?: string | null
          kind?: string
          reward?: number
          sort?: number
          target?: number
          title?: string
          url?: string | null
        }
        Relationships: []
      }
      user_servers: {
        Row: {
          created_at: string
          expires_at: string
          id: string
          rate_per_hour: number
          server_id: string
          user_id: number
        }
        Insert: {
          created_at?: string
          expires_at: string
          id?: string
          rate_per_hour: number
          server_id: string
          user_id: number
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: string
          rate_per_hour?: number
          server_id?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_servers_server_id_fkey"
            columns: ["server_id"]
            isOneToOne: false
            referencedRelation: "servers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_servers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["tg_id"]
          },
        ]
      }
      users: {
        Row: {
          ad_boost_until: string | null
          ads_date: string | null
          ads_today: number
          balance: number
          blocked: boolean
          created_at: string
          first_name: string | null
          games_date: string | null
          games_today: number
          last_seen: string
          mining_started_at: string | null
          photo_url: string | null
          ref_count: number
          ref_earned: number
          referrer_id: number | null
          started_bot: boolean
          tg_id: number
          total_mined: number
          username: string | null
        }
        Insert: {
          ad_boost_until?: string | null
          ads_date?: string | null
          ads_today?: number
          balance?: number
          blocked?: boolean
          created_at?: string
          first_name?: string | null
          games_date?: string | null
          games_today?: number
          last_seen?: string
          mining_started_at?: string | null
          photo_url?: string | null
          ref_count?: number
          ref_earned?: number
          referrer_id?: number | null
          started_bot?: boolean
          tg_id: number
          total_mined?: number
          username?: string | null
        }
        Update: {
          ad_boost_until?: string | null
          ads_date?: string | null
          ads_today?: number
          balance?: number
          blocked?: boolean
          created_at?: string
          first_name?: string | null
          games_date?: string | null
          games_today?: number
          last_seen?: string
          mining_started_at?: string | null
          photo_url?: string | null
          ref_count?: number
          ref_earned?: number
          referrer_id?: number | null
          started_bot?: boolean
          tg_id?: number
          total_mined?: number
          username?: string | null
        }
        Relationships: []
      }
      wall_ad_views: {
        Row: {
          created_at: string
          id: number
          reward: number
          tg_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          reward: number
          tg_id: number
        }
        Update: {
          created_at?: string
          id?: number
          reward?: number
          tg_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "wall_ad_views_tg_id_fkey"
            columns: ["tg_id"]
            isOneToOne: false
            referencedRelation: "wall_users"
            referencedColumns: ["tg_id"]
          },
        ]
      }
      wall_admins: {
        Row: {
          created_at: string
          role: string
          username: string
        }
        Insert: {
          created_at?: string
          role: string
          username: string
        }
        Update: {
          created_at?: string
          role?: string
          username?: string
        }
        Relationships: []
      }
      wall_anime: {
        Row: {
          balance: number
          claimed_at: string | null
          tg_id: number
        }
        Insert: {
          balance?: number
          claimed_at?: string | null
          tg_id: number
        }
        Update: {
          balance?: number
          claimed_at?: string | null
          tg_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "wall_anime_tg_id_fkey"
            columns: ["tg_id"]
            isOneToOne: true
            referencedRelation: "wall_users"
            referencedColumns: ["tg_id"]
          },
        ]
      }
      wall_checkins: {
        Row: {
          created_at: string
          id: number
          reward: number
          streak_day: number
          tg_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          reward: number
          streak_day: number
          tg_id: number
        }
        Update: {
          created_at?: string
          id?: number
          reward?: number
          streak_day?: number
          tg_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "wall_checkins_tg_id_fkey"
            columns: ["tg_id"]
            isOneToOne: false
            referencedRelation: "wall_users"
            referencedColumns: ["tg_id"]
          },
        ]
      }
      wall_gift_claims: {
        Row: {
          created_at: string
          gift_id: string
          tg_id: number
        }
        Insert: {
          created_at?: string
          gift_id: string
          tg_id: number
        }
        Update: {
          created_at?: string
          gift_id?: string
          tg_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "wall_gift_claims_gift_id_fkey"
            columns: ["gift_id"]
            isOneToOne: false
            referencedRelation: "wall_gifts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wall_gift_claims_tg_id_fkey"
            columns: ["tg_id"]
            isOneToOne: false
            referencedRelation: "wall_users"
            referencedColumns: ["tg_id"]
          },
        ]
      }
      wall_gifts: {
        Row: {
          amount: number
          created_at: string
          expires_at: string
          id: string
        }
        Insert: {
          amount: number
          created_at?: string
          expires_at: string
          id?: string
        }
        Update: {
          amount?: number
          created_at?: string
          expires_at?: string
          id?: string
        }
        Relationships: []
      }
      wall_hero_levels: {
        Row: {
          hero: number
          level: number
          tg_id: number
          updated_at: string
        }
        Insert: {
          hero: number
          level?: number
          tg_id: number
          updated_at?: string
        }
        Update: {
          hero?: number
          level?: number
          tg_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "wall_hero_levels_tg_id_fkey"
            columns: ["tg_id"]
            isOneToOne: false
            referencedRelation: "wall_users"
            referencedColumns: ["tg_id"]
          },
        ]
      }
      wall_jobs: {
        Row: {
          locked_until: string
          name: string
        }
        Insert: {
          locked_until?: string
          name: string
        }
        Update: {
          locked_until?: string
          name?: string
        }
        Relationships: []
      }
      wall_mine_passes: {
        Row: {
          created_at: string
          pass_number: number
          payment_id: string
          tg_id: number
        }
        Insert: {
          created_at?: string
          pass_number?: never
          payment_id: string
          tg_id: number
        }
        Update: {
          created_at?: string
          pass_number?: never
          payment_id?: string
          tg_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "wall_mine_passes_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: true
            referencedRelation: "wall_payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wall_mine_passes_tg_id_fkey"
            columns: ["tg_id"]
            isOneToOne: true
            referencedRelation: "wall_users"
            referencedColumns: ["tg_id"]
          },
        ]
      }
      wall_nft_supply: {
        Row: {
          cap: number
          design: number
          reserved: number
        }
        Insert: {
          cap: number
          design: number
          reserved?: number
        }
        Update: {
          cap?: number
          design?: number
          reserved?: number
        }
        Relationships: []
      }
      wall_nfts: {
        Row: {
          created_at: string
          design: number
          payment_id: string
          serial: number
          tg_id: number
        }
        Insert: {
          created_at?: string
          design: number
          payment_id: string
          serial?: never
          tg_id: number
        }
        Update: {
          created_at?: string
          design?: number
          payment_id?: string
          serial?: never
          tg_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "wall_nfts_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: true
            referencedRelation: "wall_payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wall_nfts_tg_id_fkey"
            columns: ["tg_id"]
            isOneToOne: false
            referencedRelation: "wall_users"
            referencedColumns: ["tg_id"]
          },
        ]
      }
      wall_novel_progress: {
        Row: {
          ads_used: number
          bonus_plays: number
          chapter: number
          day: string
          hearts: number
          losses: number
          plays_used: number
          step: number
          story: Json
          tg_id: number
          updated_at: string
          wins: number
        }
        Insert: {
          ads_used?: number
          bonus_plays?: number
          chapter?: number
          day?: string
          hearts?: number
          losses?: number
          plays_used?: number
          step?: number
          story?: Json
          tg_id: number
          updated_at?: string
          wins?: number
        }
        Update: {
          ads_used?: number
          bonus_plays?: number
          chapter?: number
          day?: string
          hearts?: number
          losses?: number
          plays_used?: number
          step?: number
          story?: Json
          tg_id?: number
          updated_at?: string
          wins?: number
        }
        Relationships: []
      }
      wall_novel_runs: {
        Row: {
          coins: number
          created_at: string
          day: string
          ending: string
          tg_id: number
        }
        Insert: {
          coins: number
          created_at?: string
          day?: string
          ending: string
          tg_id: number
        }
        Update: {
          coins?: number
          created_at?: string
          day?: string
          ending?: string
          tg_id?: number
        }
        Relationships: []
      }
      wall_payments: {
        Row: {
          amount_nano: number
          coins: number
          created_at: string
          id: string
          pack: string
          paid_at: string | null
          status: string
          tg_id: number
          tx_hash: string | null
        }
        Insert: {
          amount_nano: number
          coins: number
          created_at?: string
          id?: string
          pack: string
          paid_at?: string | null
          status?: string
          tg_id: number
          tx_hash?: string | null
        }
        Update: {
          amount_nano?: number
          coins?: number
          created_at?: string
          id?: string
          pack?: string
          paid_at?: string | null
          status?: string
          tg_id?: number
          tx_hash?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wall_payments_tg_id_fkey"
            columns: ["tg_id"]
            isOneToOne: false
            referencedRelation: "wall_users"
            referencedColumns: ["tg_id"]
          },
        ]
      }
      wall_raid_state: {
        Row: {
          created_at: string
          keys: number
          shields: number
          spins: number
          spins_at: string
          tg_id: number
        }
        Insert: {
          created_at?: string
          keys?: number
          shields?: number
          spins?: number
          spins_at?: string
          tg_id: number
        }
        Update: {
          created_at?: string
          keys?: number
          shields?: number
          spins?: number
          spins_at?: string
          tg_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "wall_raid_state_tg_id_fkey"
            columns: ["tg_id"]
            isOneToOne: true
            referencedRelation: "wall_users"
            referencedColumns: ["tg_id"]
          },
        ]
      }
      wall_raids: {
        Row: {
          amount: number
          attacker: number
          avenged: boolean
          blocked: boolean
          created_at: string
          id: number
          revenge: boolean
          victim: number
        }
        Insert: {
          amount?: number
          attacker: number
          avenged?: boolean
          blocked?: boolean
          created_at?: string
          id?: never
          revenge?: boolean
          victim: number
        }
        Update: {
          amount?: number
          attacker?: number
          avenged?: boolean
          blocked?: boolean
          created_at?: string
          id?: never
          revenge?: boolean
          victim?: number
        }
        Relationships: []
      }
      wall_story_attempts: {
        Row: {
          chapter: number
          day: string
          hint_used: boolean
          letters_shown: number
          solved: boolean
          solved_at: string | null
          solved_rank: number | null
          tg_id: number
          tries: number
        }
        Insert: {
          chapter: number
          day: string
          hint_used?: boolean
          letters_shown?: number
          solved?: boolean
          solved_at?: string | null
          solved_rank?: number | null
          tg_id: number
          tries?: number
        }
        Update: {
          chapter?: number
          day?: string
          hint_used?: boolean
          letters_shown?: number
          solved?: boolean
          solved_at?: string | null
          solved_rank?: number | null
          tg_id?: number
          tries?: number
        }
        Relationships: [
          {
            foreignKeyName: "wall_story_attempts_tg_id_fkey"
            columns: ["tg_id"]
            isOneToOne: false
            referencedRelation: "wall_users"
            referencedColumns: ["tg_id"]
          },
        ]
      }
      wall_story_chapters: {
        Row: {
          answer_norm: string
          hint: string
          id: number
          image_key: string
          reward: number
          riddle: string
          story: string
          title: string
        }
        Insert: {
          answer_norm: string
          hint: string
          id: number
          image_key: string
          reward?: number
          riddle: string
          story: string
          title: string
        }
        Update: {
          answer_norm?: string
          hint?: string
          id?: number
          image_key?: string
          reward?: number
          riddle?: string
          story?: string
          title?: string
        }
        Relationships: []
      }
      wall_story_state: {
        Row: {
          blades: number
          created_at: string
          extra_tries: number
          hints: number
          letters: number
          tg_id: number
        }
        Insert: {
          blades?: number
          created_at?: string
          extra_tries?: number
          hints?: number
          letters?: number
          tg_id: number
        }
        Update: {
          blades?: number
          created_at?: string
          extra_tries?: number
          hints?: number
          letters?: number
          tg_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "wall_story_state_tg_id_fkey"
            columns: ["tg_id"]
            isOneToOne: true
            referencedRelation: "wall_users"
            referencedColumns: ["tg_id"]
          },
        ]
      }
      wall_task_progress: {
        Row: {
          claims_count: number
          last_claimed_at: string | null
          started_at: string | null
          task_id: string
          tg_id: number
        }
        Insert: {
          claims_count?: number
          last_claimed_at?: string | null
          started_at?: string | null
          task_id: string
          tg_id: number
        }
        Update: {
          claims_count?: number
          last_claimed_at?: string | null
          started_at?: string | null
          task_id?: string
          tg_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "wall_task_progress_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "wall_tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wall_task_progress_tg_id_fkey"
            columns: ["tg_id"]
            isOneToOne: false
            referencedRelation: "wall_users"
            referencedColumns: ["tg_id"]
          },
        ]
      }
      wall_tasks: {
        Row: {
          active: boolean
          category: string
          chat_id: string | null
          cooldown_hours: number | null
          created_at: string
          emoji: string
          id: string
          kind: string
          required: number
          reward: number
          sort: number
          title: string
          updated_at: string
          url: string | null
        }
        Insert: {
          active?: boolean
          category?: string
          chat_id?: string | null
          cooldown_hours?: number | null
          created_at?: string
          emoji?: string
          id?: string
          kind?: string
          required?: number
          reward?: number
          sort?: number
          title: string
          updated_at?: string
          url?: string | null
        }
        Update: {
          active?: boolean
          category?: string
          chat_id?: string | null
          cooldown_hours?: number | null
          created_at?: string
          emoji?: string
          id?: string
          kind?: string
          required?: number
          reward?: number
          sort?: number
          title?: string
          updated_at?: string
          url?: string | null
        }
        Relationships: []
      }
      wall_users: {
        Row: {
          balance: number
          bot_blocked: boolean
          checkin_streak: number
          created_at: string
          first_name: string
          language_code: string | null
          last_checkin_at: string | null
          last_seen_at: string
          mined_at: string
          notified_slot: string | null
          photo_url: string | null
          referrer_id: number | null
          tg_id: number
          total_level: number
          username: string | null
          wallet_address: string | null
        }
        Insert: {
          balance?: number
          bot_blocked?: boolean
          checkin_streak?: number
          created_at?: string
          first_name?: string
          language_code?: string | null
          last_checkin_at?: string | null
          last_seen_at?: string
          mined_at?: string
          notified_slot?: string | null
          photo_url?: string | null
          referrer_id?: number | null
          tg_id: number
          total_level?: number
          username?: string | null
          wallet_address?: string | null
        }
        Update: {
          balance?: number
          bot_blocked?: boolean
          checkin_streak?: number
          created_at?: string
          first_name?: string
          language_code?: string | null
          last_checkin_at?: string | null
          last_seen_at?: string
          mined_at?: string
          notified_slot?: string | null
          photo_url?: string | null
          referrer_id?: number | null
          tg_id?: number
          total_level?: number
          username?: string | null
          wallet_address?: string | null
        }
        Relationships: []
      }
      wall_vault: {
        Row: {
          id: number
          last_win: number | null
          last_win_at: string | null
          last_winner: number | null
          pot: number
        }
        Insert: {
          id?: number
          last_win?: number | null
          last_win_at?: string | null
          last_winner?: number | null
          pot?: number
        }
        Update: {
          id?: number
          last_win?: number | null
          last_win_at?: string | null
          last_winner?: number | null
          pot?: number
        }
        Relationships: []
      }
      wall_withdrawals: {
        Row: {
          address: string
          amount: number
          created_at: string
          id: string
          status: string
          tg_id: number
        }
        Insert: {
          address: string
          amount: number
          created_at?: string
          id?: string
          status?: string
          tg_id: number
        }
        Update: {
          address?: string
          amount?: number
          created_at?: string
          id?: string
          status?: string
          tg_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "wall_withdrawals_tg_id_fkey"
            columns: ["tg_id"]
            isOneToOne: false
            referencedRelation: "wall_users"
            referencedColumns: ["tg_id"]
          },
        ]
      }
      withdrawals: {
        Row: {
          address: string
          amount: number
          created_at: string
          id: string
          status: string
          tx_note: string | null
          user_id: number
        }
        Insert: {
          address: string
          amount: number
          created_at?: string
          id?: string
          status?: string
          tx_note?: string | null
          user_id: number
        }
        Update: {
          address?: string
          amount?: number
          created_at?: string
          id?: string
          status?: string
          tx_note?: string | null
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "withdrawals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["tg_id"]
          },
        ]
      }
      zro_draw_entries: {
        Row: {
          created_at: string
          draw_day: string
          id: string
          tg_id: number
        }
        Insert: {
          created_at?: string
          draw_day?: string
          id?: string
          tg_id: number
        }
        Update: {
          created_at?: string
          draw_day?: string
          id?: string
          tg_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "zro_draw_entries_tg_id_fkey"
            columns: ["tg_id"]
            isOneToOne: false
            referencedRelation: "zro_users"
            referencedColumns: ["tg_id"]
          },
        ]
      }
      zro_payments: {
        Row: {
          amount: number
          created_at: string
          kind: string
          memo: string
          ref: string | null
          tg_id: number
        }
        Insert: {
          amount: number
          created_at?: string
          kind: string
          memo: string
          ref?: string | null
          tg_id: number
        }
        Update: {
          amount?: number
          created_at?: string
          kind?: string
          memo?: string
          ref?: string | null
          tg_id?: number
        }
        Relationships: []
      }
      zro_season_claims: {
        Row: {
          created_at: string
          tg_id: number
          tier: number
          track: string
        }
        Insert: {
          created_at?: string
          tg_id: number
          tier: number
          track: string
        }
        Update: {
          created_at?: string
          tg_id?: number
          tier?: number
          track?: string
        }
        Relationships: [
          {
            foreignKeyName: "zro_season_claims_tg_id_fkey"
            columns: ["tg_id"]
            isOneToOne: false
            referencedRelation: "zro_users"
            referencedColumns: ["tg_id"]
          },
        ]
      }
      zro_task_claims: {
        Row: {
          created_at: string
          task_id: string
          tg_id: number
        }
        Insert: {
          created_at?: string
          task_id: string
          tg_id: number
        }
        Update: {
          created_at?: string
          task_id?: string
          tg_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "zro_task_claims_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "zro_tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "zro_task_claims_tg_id_fkey"
            columns: ["tg_id"]
            isOneToOne: false
            referencedRelation: "zro_users"
            referencedColumns: ["tg_id"]
          },
        ]
      }
      zro_tasks: {
        Row: {
          active: boolean
          chat_id: string | null
          created_at: string
          expires_at: string | null
          id: string
          owner_tg: number | null
          pay_memo: string | null
          reward_energy: number
          sort: number
          title: string
          url: string
        }
        Insert: {
          active?: boolean
          chat_id?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          owner_tg?: number | null
          pay_memo?: string | null
          reward_energy?: number
          sort?: number
          title: string
          url: string
        }
        Update: {
          active?: boolean
          chat_id?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          owner_tg?: number | null
          pay_memo?: string | null
          reward_energy?: number
          sort?: number
          title?: string
          url?: string
        }
        Relationships: []
      }
      zro_users: {
        Row: {
          ads_watched: number
          created_at: string
          energy: number
          first_name: string | null
          gram: number
          last_ad_at: string | null
          last_daily: string | null
          last_share: string | null
          photo_url: string | null
          position: number
          premium: boolean
          ref_by: number | null
          regen_from: string
          spins: number
          tg_id: number
          updated_at: string
          username: string | null
          verified: boolean
          wallet_address: string | null
          xp: number
          zro: number
        }
        Insert: {
          ads_watched?: number
          created_at?: string
          energy?: number
          first_name?: string | null
          gram?: number
          last_ad_at?: string | null
          last_daily?: string | null
          last_share?: string | null
          photo_url?: string | null
          position?: number
          premium?: boolean
          ref_by?: number | null
          regen_from?: string
          spins?: number
          tg_id: number
          updated_at?: string
          username?: string | null
          verified?: boolean
          wallet_address?: string | null
          xp?: number
          zro?: number
        }
        Update: {
          ads_watched?: number
          created_at?: string
          energy?: number
          first_name?: string | null
          gram?: number
          last_ad_at?: string | null
          last_daily?: string | null
          last_share?: string | null
          photo_url?: string | null
          position?: number
          premium?: boolean
          ref_by?: number | null
          regen_from?: string
          spins?: number
          tg_id?: number
          updated_at?: string
          username?: string | null
          verified?: boolean
          wallet_address?: string | null
          xp?: number
          zro?: number
        }
        Relationships: []
      }
      zro_withdrawals: {
        Row: {
          address: string
          amount: number
          coin: string
          created_at: string
          id: string
          status: string
          tg_id: number
        }
        Insert: {
          address: string
          amount: number
          coin: string
          created_at?: string
          id?: string
          status?: string
          tg_id: number
        }
        Update: {
          address?: string
          amount?: number
          coin?: string
          created_at?: string
          id?: string
          status?: string
          tg_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "zro_withdrawals_tg_id_fkey"
            columns: ["tg_id"]
            isOneToOne: false
            referencedRelation: "zro_users"
            referencedColumns: ["tg_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_balance: { Args: { _amount: number; _uid: number }; Returns: number }
      clau_claim_gift: { Args: { _gift: string; _tg: number }; Returns: number }
      clau_claim_job: {
        Args: { _every_seconds: number; _key: string }
        Returns: boolean
      }
      clau_credit: {
        Args: { _amount: number; _mined?: boolean; _tg: number }
        Returns: number
      }
      clau_debit: { Args: { _amount: number; _tg: number }; Returns: boolean }
      clau_lock_broadcast: {
        Args: never
        Returns: {
          created_at: string
          cursor: number
          done: boolean
          failed: number
          gift_id: string | null
          id: string
          key: string
          kind: string
          locked_until: string | null
          photo_url: string | null
          sent: number
          text: string
        }[]
        SetofOptions: {
          from: "*"
          to: "clau_broadcasts"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      gama_claim_gift: { Args: { _gid: string; _uid: number }; Returns: number }
      gama_claim_task: {
        Args: { _task_id: string; _uid: number }
        Returns: number
      }
      gama_confirm_payment: {
        Args: { _pid: string; _tx: string }
        Returns: Json
      }
      gama_game_finish: {
        Args: { _score: number; _sid: string; _uid: number }
        Returns: number
      }
      gama_game_start: {
        Args: { _game: string; _uid: number }
        Returns: string
      }
      gama_mining_boost: { Args: { _uid: number }; Returns: number }
      gama_mining_claim: { Args: { _uid: number }; Returns: number }
      gama_mining_start: { Args: { _uid: number }; Returns: undefined }
      gama_post_lock: { Args: { _key: string }; Returns: boolean }
      gama_rate: { Args: { _uid: number }; Returns: number }
      gama_record_ad: {
        Args: { _purpose: string; _uid: number }
        Returns: undefined
      }
      gama_register: {
        Args: {
          _first: string
          _from_bot: boolean
          _photo: string
          _ref: number
          _uid: number
          _username: string
        }
        Returns: boolean
      }
      gama_session_hours: { Args: never; Returns: number }
      gama_stats: { Args: never; Returns: Json }
      gama_tick: { Args: { _uid: number }; Returns: undefined }
      gama_watch_ad: { Args: { _uid: number }; Returns: number }
      gama_withdraw: {
        Args: { _address: string; _amount: number; _uid: number }
        Returns: string
      }
      gama_withdraw_process: {
        Args: { _note: string; _status: string; _wid: string }
        Returns: number
      }
      gm_admin_stats: { Args: never; Returns: Json }
      gm_buy_with_balance: {
        Args: { p_cap_hours: number; p_server: number; p_user: number }
        Returns: string
      }
      gm_claim_challenge: {
        Args: {
          p_ads: number
          p_level: number
          p_reward: number
          p_user: number
        }
        Returns: number
      }
      gm_claim_free_server: {
        Args: { p_cap_hours: number; p_server: number; p_user: number }
        Returns: string
      }
      gm_claim_gift: {
        Args: { p_gift: string; p_user: number }
        Returns: number
      }
      gm_complete_task: {
        Args: { p_task: string; p_user: number; p_verified: boolean }
        Returns: number
      }
      gm_confirm_payment: {
        Args: {
          p_cap_hours: number
          p_intent: string
          p_ref_pct: number
          p_sender: string
          p_tx: string
        }
        Returns: Json
      }
      gm_grant_server: {
        Args: {
          p_cap_hours: number
          p_server: number
          p_source: string
          p_user: number
        }
        Returns: string
      }
      gm_process_withdrawal: {
        Args: {
          p_admin: number
          p_id: string
          p_note: string
          p_paid: boolean
          p_tx: string
        }
        Returns: Json
      }
      gm_record_ad: {
        Args: {
          p_daily_cap: number
          p_min_secs: number
          p_reward: number
          p_user: number
        }
        Returns: Json
      }
      gm_register_user: {
        Args: {
          p_first: string
          p_from_bot: boolean
          p_id: number
          p_lang: string
          p_last: string
          p_photo: string
          p_ref: number
          p_ref_bonus: number
          p_username: string
        }
        Returns: Json
      }
      gm_request_withdrawal: {
        Args: {
          p_address: string
          p_ads_req: number
          p_amount: number
          p_min: number
          p_refs_req: number
          p_user: number
        }
        Returns: string
      }
      gm_settle_mining: {
        Args: { p_cap_hours: number; p_user: number }
        Returns: number
      }
      orai_claim_gift: { Args: { _cid: string; _tid: number }; Returns: number }
      orai_claim_job: {
        Args: { _key: string; _name: string }
        Returns: boolean
      }
      orai_claim_mining: {
        Args: { _ref_share: number; _tid: number }
        Returns: number
      }
      orai_complete_task: {
        Args: { _task: string; _tid: number }
        Returns: number
      }
      orai_consume_ad: {
        Args: {
          _id: number
          _kind: string
          _max_age_seconds: number
          _tid: number
        }
        Returns: boolean
      }
      orai_credit: {
        Args: { _amount: number; _mined?: boolean; _tid: number }
        Returns: number
      }
      orai_rebase_mining: {
        Args: { _add_boost?: number; _new_rate: number; _tid: number }
        Returns: undefined
      }
      orai_record_ad: {
        Args: {
          _cap: number
          _gap_seconds: number
          _kind: string
          _reward: number
          _tid: number
        }
        Returns: number
      }
      orai_refund_withdrawal: {
        Args: { _error: string; _status: string; _wid: string }
        Returns: boolean
      }
      orai_register_user: {
        Args: {
          _bonus: number
          _first: string
          _from_bot: boolean
          _lang: string
          _last: string
          _photo: string
          _ref: number
          _tid: number
          _username: string
        }
        Returns: Json
      }
      orai_request_withdrawal: {
        Args: { _address: string; _amount: number; _tid: number }
        Returns: string
      }
      orai_server_ad_step: {
        Args: { _need: number; _server: string; _tid: number }
        Returns: number
      }
      orai_stats: { Args: never; Returns: Json }
      orai_try_lock: {
        Args: { _name: string; _seconds: number }
        Returns: boolean
      }
      orai_unlock: { Args: { _name: string }; Returns: undefined }
      orange_add_balance: {
        Args: { _amount: number; _uid: number }
        Returns: number
      }
      orange_base_rate: { Args: never; Returns: number }
      orange_claim_gift: {
        Args: { _gid: string; _uid: number }
        Returns: number
      }
      orange_claim_task: {
        Args: { _task_id: string; _uid: number }
        Returns: number
      }
      orange_confirm_payment: {
        Args: { _pid: string; _tx: string }
        Returns: Json
      }
      orange_daily_checkin: { Args: { _uid: number }; Returns: Json }
      orange_game_double: {
        Args: { _ad_id: number; _sid: string; _uid: number }
        Returns: number
      }
      orange_game_finish: {
        Args: { _reward: number; _score: number; _sid: string; _uid: number }
        Returns: number
      }
      orange_game_start: {
        Args: { _ad_id: number; _game: string; _uid: number }
        Returns: string
      }
      orange_mining_boost: {
        Args: { _ad_id: number; _uid: number }
        Returns: string
      }
      orange_mining_claim: { Args: { _uid: number }; Returns: number }
      orange_mining_start: {
        Args: { _ad_id: number; _uid: number }
        Returns: undefined
      }
      orange_rate: { Args: { _uid: number }; Returns: number }
      orange_record_ad: {
        Args: { _purpose: string; _uid: number }
        Returns: number
      }
      orange_register: {
        Args: {
          _first: string
          _from_bot: boolean
          _photo: string
          _ref: number
          _uid: number
          _username: string
        }
        Returns: boolean
      }
      orange_session_hours: { Args: never; Returns: number }
      orange_tick: { Args: { _uid: number }; Returns: undefined }
      orange_use_ad: {
        Args: { _ad_id: number; _purpose: string; _uid: number }
        Returns: boolean
      }
      orange_wallet_fee_nano: { Args: never; Returns: number }
      orange_wallet_payment: {
        Args: { _address: string; _uid: number }
        Returns: {
          amount_nano: number
          confirmed_at: string | null
          created_at: string
          id: string
          kind: string
          memo: string
          ref_id: string | null
          status: string
          tx_hash: string | null
          user_id: number
        }
        SetofOptions: {
          from: "*"
          to: "orange_payments"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      orange_withdraw: {
        Args: { _address: string; _amount: number; _uid: number }
        Returns: string
      }
      orange_withdraw_process: {
        Args: { _note: string; _status: string; _wid: string }
        Returns: undefined
      }
      wall_ad_reward: { Args: { _tg: number }; Returns: number }
      wall_anime_claim: { Args: { _tg: number }; Returns: number }
      wall_anime_withdraw: {
        Args: { _address: string; _amount: number; _tg: number }
        Returns: string
      }
      wall_claim_gift: { Args: { _gift: string; _tg: number }; Returns: number }
      wall_claim_task: {
        Args: { _task: string; _tg: number; _verified: boolean }
        Returns: number
      }
      wall_confirm_payment: {
        Args: { _id: string; _tx: string }
        Returns: number
      }
      wall_daily_checkin: { Args: { _tg: number }; Returns: Json }
      wall_ensure_heroes: { Args: { _tg: number }; Returns: undefined }
      wall_hero_cost: {
        Args: { _hero: number; _level: number }
        Returns: number
      }
      wall_hero_rate: {
        Args: { _hero: number; _level: number }
        Returns: number
      }
      wall_job_lock: {
        Args: { _name: string; _seconds: number }
        Returns: boolean
      }
      wall_mining_claim: { Args: { _tg: number }; Returns: number }
      wall_mining_rate: { Args: { _tg: number }; Returns: number }
      wall_nft_pick: { Args: { _r: number }; Returns: number }
      wall_nft_remaining: {
        Args: never
        Returns: {
          cap: number
          design: number
          remaining: number
        }[]
      }
      wall_nft_roll: { Args: { _r: number }; Returns: number }
      wall_novel_ad: { Args: { _tg: number }; Returns: Json }
      wall_novel_finish: {
        Args: { _ending: string; _tg: number }
        Returns: Json
      }
      wall_novel_play: { Args: { _risk: string; _tg: number }; Returns: Json }
      wall_novel_row: {
        Args: { _tg: number }
        Returns: {
          ads_used: number
          bonus_plays: number
          chapter: number
          day: string
          hearts: number
          losses: number
          plays_used: number
          step: number
          story: Json
          tg_id: number
          updated_at: string
          wins: number
        }
        SetofOptions: {
          from: "*"
          to: "wall_novel_progress"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      wall_raid_load: {
        Args: { _tg: number }
        Returns: {
          created_at: string
          keys: number
          shields: number
          spins: number
          spins_at: string
          tg_id: number
        }
        SetofOptions: {
          from: "*"
          to: "wall_raid_state"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      wall_raid_spin: {
        Args: { _revenge?: number; _tg: number }
        Returns: Json
      }
      wall_start_task: {
        Args: { _task: string; _tg: number }
        Returns: undefined
      }
      wall_story_answer: {
        Args: { _guess: string; _tg: number }
        Returns: Json
      }
      wall_story_norm: { Args: { _t: string }; Returns: string }
      wall_story_today: { Args: never; Returns: number }
      wall_story_use: { Args: { _item: string; _tg: number }; Returns: Json }
      wall_today_gift: { Args: { _amount: number }; Returns: string }
      wall_upgrade_hero: {
        Args: { _hero: number; _tg: number }
        Returns: number
      }
      wall_upsert_user: {
        Args: {
          _first: string
          _photo: string
          _ref: number
          _tg: number
          _username: string
        }
        Returns: undefined
      }
      zro_invite_reward: {
        Args: { _amount: number; _tg: number }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
