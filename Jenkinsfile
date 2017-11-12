// https://issues.jenkins-ci.org/browse/JENKINS-28447, Jenkins file must be set to origin/master

// getting properties from method also avoid not serializable exception
def getUserTriggerProperties() {
    def userCause = currentBuild.rawBuild.getCause(hudson.model.Cause$UserIdCause)
    if (userCause != null) {
        // User cause [userName: 'user full name', userId: 'username', shortDescription: 'Started by user Vojta']
//            println "User cause ${userCause.properties}"
        return userCause.properties
    } else {
        return null
    }
}

node {
    stage('Checkout') {
        checkout([
                $class                           : 'GitSCM',
                branches                         : scm.branches,
                extensions                       : scm.extensions + [[$class: 'LocalBranch'], [$class: 'WipeWorkspace']],
                userRemoteConfigs                : [[credentialsId: 'sobik', url: 'git@github.com:vojtechsoban/csv-import.git']],
                doGenerateSubmoduleConfigurations: false
        ])
        sh "git checkout ${BRANCH_NAME}"
    }
    stage('Build info') {
        /*
        http://localhost:8081/scriptApproval/
        method hudson.model.Run getCause java.lang.Class
        method hudson.plugins.git.GitSCM getBranches
        method hudson.plugins.git.GitSCMBackwardCompatibility getExtensions
        method org.jenkinsci.plugins.workflow.support.steps.build.RunWrapper getRawBuild
        staticMethod org.codehaus.groovy.runtime.DefaultGroovyMethods getProperties java.lang.Object
        */

        sh 'git branch'
        sh 'node --version'
        sh 'yarn --version'
    }
    if (DEPLOY_TO) {
        stage('Deploy') {
            def userProperties = getUserTriggerProperties()
            // Deploy can be made by human therefore user properties must exist
            assert userProperties : "Missing UserIdCause. Not started by user?"
            assert DEPLOY_TO != 'prod' || (DEPLOY_TO == 'prod' && BRANCH_NAME =='origin/master') || PROD_CONFIRM == 'yes'
            echo "Started deployment of branch ${BRANCH_NAME} to server ${DEPLOY_TO} by user ${userProperties.userId} (${userProperties.userName})"
        }
    } else {
        echo 'skipping deployment since DEPLOY_TO not defined'
    }
    stage('Finish') {
        echo "Done"
    }
}
