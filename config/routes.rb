Rails.application.routes.draw do
  get 'account' => "account#show"
  get 'contact' => "application#contact"
  get 'sitemap' => "sitemap#index"

  devise_for :users

  mount Blazer::Engine, at: 'admin'

  resources :courses do
    collection do
      post :import_from_youtube, path: "/import/youtube"
    end

    member do
      get :resume
    end

    resources :lessons, only: [:show, :destroy] do
      member do
        get :previous
        get :next
      end
      resources :status, only: [:create] do
        collection do
          post :finish, as: :finish
        end
      end
    end
  end

  root 'courses#index'
end
