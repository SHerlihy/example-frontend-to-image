packer {
  required_plugins {
    amazon = {
      source  = "github.com/hashicorp/amazon"
      version = "~> 1"
    }
  }
}

//variable "AWS_ACCESS_KEY_ID" {
//  type = string
//  default = ""
//}
//
//variable "AWS_SECRET_ACCESS_KEY" {
//  type = string
//  default = ""
//}

locals {
  timestamp = regex_replace(timestamp(), "[- TZ:]", "")
}

source "amazon-ebs" "frontend-example" {
  //AMI Conf:
  // 09/23 ami_users by default creator is user
  ami_name    = format("%s/%s","frontend-example",local.timestamp) 
  ami_regions = ["eu-west-2"]

  //Access Conf:

//  access_key = var.AWS_ACCESS_KEY_ID
  region     = "eu-west-2"
//  secret_key = var.AWS_SECRET_ACCESS_KEY

  //Run Conf:
  instance_type = "t2.micro"
  // source_ami = ??? : source_ami_filter will populate this
  source_ami_filter {
    filters = {
      name                = "ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"
      root-device-type    = "ebs"
      virtualization-type = "hvm"
    }
    most_recent = true
    owners      = ["099720109477"]
  }

  //Communicator Conf:
  ssh_username = "ubuntu"
}
// 111644099040
build {
  name = "frontend-example"
  sources = [
    "source.amazon-ebs.frontend-example"
  ]

  // get html/js files on server
  // get .sh scrpt to serve on apache server

  provisioner "shell" {
    inline = [
      "mkdir /home/ubuntu/www",
      "mkdir /home/ubuntu/www/public",
      "mkdir /home/ubuntu/www/src"
    ]
  }

  provisioner "file" {
    source      = "./index.html"
    destination = "/home/ubuntu/www/index.html"
  }

  provisioner "file" {
    source      = "./public/"
    destination = "/home/ubuntu/www/public/"
  }

  provisioner "file" {
    source      = "./src/"
    destination = "/home/ubuntu/www/src/"
  }

  provisioner "file" {
    source = "./config_server.sh"
    destination = "~/config_server.sh"
  }

  provisioner "file" {
    source = "./position_files.sh"
    destination = "~/position_files.sh"
  }

  provisioner "shell" {
      inline = [
        "sudo bash ~/config_server.sh"
      ]
  }

  provisioner "shell" {
      inline = [
        "sudo bash ~/position_files.sh"
      ]
  }
}

