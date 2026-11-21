
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
        success {
            echo 'CI Pipeline and Docker Image Builds Completed Successfully!'
        }

        failure {
            echo 'Pipeline Failed. Check the console output.'
        }
    }
}
