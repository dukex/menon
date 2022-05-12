web: bin/rails server -p ${PORT:-5000} -e $RAILS_ENV
rescue: QUEUE=* bin/rake resque:work
