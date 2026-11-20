
pipeline {

    agent any

    stages {

        stage('Welcome') {
            steps {
                echo 'Welcome to Jenkins Pipeline!'
                echo 'Learning CI/CD Automation'
            }
        }

        stage('Environment Check') {
            steps {
                sh 'whoami'
                sh 'java -version'
                sh 'git --version'
                sh 'pwd'
            }
        }

        stage('Build') {
            steps {
                echo 'Starting application build...'
                echo 'Build stage completed!'
            }
        }

        stage('Test') {
            steps {
                echo 'Running application tests...'
                echo 'Test stage completed!'
            }
        }

    }

    post {
        success {
            echo 'Pipeline executed successfully!'
        }

        failure {
            echo 'Pipeline execution failed!'
        }
    }
}
