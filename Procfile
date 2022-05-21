web: bin/start-nginx bin/rails server -p ${PORT:-5000} -e $RAILS_ENV
resque: QUEUE=* bin/rake resque:work
