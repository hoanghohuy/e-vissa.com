pipeline {
    agent any
    
    stages {
        stage('Pull code') {
            steps {
                script {
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'Server e-vissa', 
                                transfers: [
                                    sshTransfer(
                                        cleanRemote: false, 
                                        excludes: '', 
                                        execCommand: 'cd /home/data/e-vissa && git pull origin master && docker compose up -d --build e-vissa', 
                                        execTimeout: 900000, // 15m
                                        flatten: false, 
                                        makeEmptyDirs: false, 
                                        noDefaultExcludes: false, 
                                        patternSeparator: '[, ]+', 
                                        remoteDirectory: '', 
                                        remoteDirectorySDF: false, 
                                        removePrefix: '', 
                                        sourceFiles: ''
                                    )
                                ], 
                                usePromotionTimestamp: false, 
                                useWorkspaceInPromotion: false, 
                                verbose: false
                            )
                        ]
                    )
                }
            }
        }
    }
    post {
        success {
            mail(
                bcc: '', 
                body: 'CICD e-vissa built successfully', 
                cc: 'hhhoang.h3@gmail.com', 
                from: '', 
                replyTo: '', 
                subject: 'CICD e-vissa built successfully', 
                to: 'congthuong147@gmail.com'
            )
        }
        failure {
            mail(
                bcc: '', 
                body: 'CICD e-vissa built failed', 
                cc: 'hhhoang.h3@gmail.com', 
                from: '', 
                replyTo: '', 
                subject: 'CICD e-vissa built failed', 
                to: 'congthuong147@gmail.com'
            )
        }
    }
}
