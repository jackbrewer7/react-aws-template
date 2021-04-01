# react-aws-template
Create a website using react and aws in 30 minutes

Original template/inspiration

https://medium.com/bb-tutorials-and-thoughts/aws-deploying-react-with-java-app-on-elastic-beanstalk-fb8a96b90c4

I personally use IntelliJ IDEA Ultimate.

## Steps:
- git clone https://github.com/jackbrewer7/react-aws-template.git
- Open project in IntelliJ
- Open as Maven project
- Open the terminal in IntelliJ
- Some dependencies may have to be installed
  - Java
  - Node
  - NPM
  - Maven
  - Gulp
    -npm install --global gulp-cli (inside root of directory)
- mvn clean install
- java -jar target/yourwebsite-1.0-SNAPSHOT.jar
- Open up Chrome to http://localhost:5000/

Here you will see a basic app with a create user and get all users functionality. This will not work until you set up AWS credentials and Dynamo backend in AWS.

## Steps to hookup backend


# Finish this once I am done refactoring code

