Rails.application.routes.draw do
  root to: "static_pages#root"
  get "*path", to: "static_pages#root"
end
