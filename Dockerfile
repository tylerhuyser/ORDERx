FROM ruby:3.2.2

# Install dependencies
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client

WORKDIR /app

# Install gems
COPY Gemfile Gemfile.lock ./
RUN bundle install

# Copy the rest of the application
COPY . .

# Make sure bin scripts are executable
RUN chmod +x bin/*

EXPOSE 3000

# Default command
CMD ["bin/rails", "server", "-e", "production", "-b", "0.0.0.0", "-p", "3000"]
