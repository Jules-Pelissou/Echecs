pipeline {
    agent none
        stages {
            stage('Build') {
                agent { docker {
                    image 'mcr.microsoft.com/playwright:v1.57.0-noble'
                    args '--network=host'
                }}
                environment {
                    NETLIFY_AUTH_TOKEN = credentials('NETLIFY_TOKEN')
                }
                when { branch 'main' }
                steps {
                    sh 'npm install'
                    sh 'npm run build'
                    sh 'npx netlify deploy --prod --site tpdevopsfie4.netlify.app'
                }
            post {
                always {
                    publishHTML([
                        allowMissing: true,
                        alwaysLinkToLastBuild: false,
                        icon: '', keepAll: true,
                        reportDir: 'html',
                        reportFiles: 'index.html',
                        reportName: 'VitestReport',
                        reportTitles: '',
                        useWrapperFileDirectly: true
                        ])
                }
            }
            }
            stage('docker') {
                agent any
                when { branch 'main' }
                environment {
                    CI_REGISTRY = 'ghcr.io'
                    CI_REGISTRY_USER = 'jules-pelissou'
                    CI_REGISTRY_IMAGE = "$CI_REGISTRY" + '/' + "$CI_REGISTRY_USER" + '/chess'
                    CI_REGISTRY_PASSWORD = credentials('CI_REGISTRY_PASSWORD')
                }
                steps {
                    sh 'docker buildx build -t --network=host $CI_REGISTRY_IMAGE .'
                    sh 'docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY'
                    sh 'docker push $CI_REGISTRY_IMAGE'
                }
            }
        }
}
