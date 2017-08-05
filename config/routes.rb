Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :users,          only: %i(create show update)
      resources :notations
      resource  :session,        only: %i(create destroy)
      resources :user_notations, only: %i(create destroy)
    end
  end

  root to: "static_pages#root"
  get "*path", to: "static_pages#root"
end
