Rails.application.routes.draw do
  devise_for :users
  resources :courses do
    member do
      post :import_youtube, path: "/import/youtube"
    end

    resources :lessons, only: [:show, :destroy]
  end

  root 'courses#index'
end
