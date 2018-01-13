source "https://rubygems.org"

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

gem "aws-sdk", ">= 2.0"
gem "bcrypt", "~> 3.1.7"
gem "figaro"
gem "jbuilder", "~> 2.5"
gem "jquery-rails"
gem "paperclip"
gem "pg", "~> 0.18"
gem "puma", "~> 3.0"
gem "rails", "~> 5.0.5"
gem "sass-rails", "~> 5.0"
gem "uglifier", ">= 1.3.0"
gem "faker"

group :development, :test do
  gem "byebug", platform: :mri
  gem "rubocop", "~> 0.52.1"
end

group :development do
  gem "annotate"
  gem "better_errors"
  gem "binding_of_caller"
  gem "listen", "~> 3.0.5"
  gem "pry-rails"
  gem "spring"
  gem "spring-watcher-listen", "~> 2.0.0"
  gem "web-console", ">= 3.3.0"
end

group :production do
  gem "rails_12factor"
end

gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]
