# Full-Stack Web Application: Beatriz Galarza Cloudfolio

![Live Website](screenshots/14.%20Live%20Website.png)

# Project Overview
This project focuses on designing and deploying BGalarza CloudFolio,  a portfolio website, using key AWS cloud services. The site displays projects, AWS skills, and includes a working contact form. It runs on a scalable, reliable cloud setup that uses EC2, Application Load Balancer, Auto Scaling, DynamoDB, S3, and CloudFront.

# Setup Instructions
1. Create a VPC with CIDR 10.0.0.0/16, two public subnets in us-east-1a and us-east-1b, an Internet Gateway, and route tables.
2. Create Security Groups: one for the ALB (port 80 from 0.0.0.0/0) and one for EC2 (port 3000 from the ALB security group only).
3. Create an IAM Role with a DynamoDB full access policy and attach it as an instance profile.
4. Create three DynamoDB tables (projects, skills, contacts) and seed with initial data.
5. Create a Launch Template with Amazon Linux 2023 AMI, t2.micro, security group, IAM role, and user data script installing Node.js and starting the Express API.
6. Create Target Group (port 3000, HTTP, /health check) and Application Load Balancer across both subnets.
7. Create an Auto Scaling Group using the Launch Template, desired: 2, min: 2, max: 4, attached to the Target Group.
8. Create an S3 bucket with static website hosting enabled and a public read bucket policy.
9. Create CloudFront distribution with S3 as the default origin, ALB as secondary origin, and path behaviors for /projects, /skills, /health, and /contact.
10. Upload index.html to S3 and set index.html as the CloudFront default root object.

# Architecture Diagram
![Architecture Diagram](screenshots/17.%20Architecture%20Diagram.png)
