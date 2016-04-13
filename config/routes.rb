Rails.application.routes.draw do

  resources :courses do
    resources :lessons, except: :index
  end

  root 'courses#index'
end
