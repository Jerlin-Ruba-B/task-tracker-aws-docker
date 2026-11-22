
pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Environment Check') {
            steps {
                sh 'node -v'
                sh 'npm -v'
                sh 'docker --version'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        // NEW STAGE: Start MongoDB automatically
        stage('Start Test MongoDB') {
            steps {
                sh '''
                    echo "Starting MongoDB container..."

                    docker rm -f jenkins-test-mongo || true

                    docker run -d \
                        --name jenkins-test-mongo \
                        -p 27017:27017 \
                        mongo:7

                    echo "Waiting for MongoDB to become ready..."

                    for i in $(seq 1 30); do
                        if docker exec jenkins-test-mongo \
                            mongosh --quiet \
                            --eval "db.adminCommand('ping').ok" | grep -q 1; then

                            echo "MongoDB is ready!"
                            exit 0
                        fi

                        sleep 2
                    done

                    echo "MongoDB failed to start!"
                    docker logs jenkins-test-mongo
                    exit 1
                '''
            }
        }

        stage('Run Jest Tests') {
            steps {
                dir('backend') {
                    sh 'npm test'
                }
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                sh '''
                    docker build \
                    -t task-tracker-backend:${BUILD_NUMBER} \
                    -t task-tracker-backend:latest \
                    ./backend
                '''
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                sh '''
                    docker build \
                    -t task-tracker-frontend:${BUILD_NUMBER} \
                    -t task-tracker-frontend:latest \
                    ./frontend
                '''
            }
        }

        stage('Verify Docker Images') {
            steps {
                sh 'docker images'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up temporary MongoDB container...'
            sh 'docker rm -f jenkins-test-mongo || true'
        }

        success {
            echo 'CI Pipeline and Docker Image Builds Completed Successfully!'
        }

        failure {
            echo 'Pipeline Failed. Check the console output.'
        }
    }
}
