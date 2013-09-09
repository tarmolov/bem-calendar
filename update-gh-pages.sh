if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
    echo -e "Starting to update gh-pages\n"

    git config --global user.email "travis@travis-ci.org"
    git config --global user.name "Travis"

    YENV=production make build
    git clone -b gh-pages https://${GH_TOKEN}@github.com/tarmolov/bem-calendar.git deploy
    cd deploy
    rm -rf *
    cd ..
    rsync -avz --stats --include "*.html" --include "_*.css" --include "_*.js" pages/ deploy/pages
    rsync -avz --stats i/ deploy/i

    cd deploy
    git add -A
    git commit -m "update doc"
    git commit -m "Travis build $TRAVIS_BUILD_NUMBER pushed to gh-pages"
    git push origin gh-pages
fi
