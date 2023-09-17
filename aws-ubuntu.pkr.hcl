packer {
  required_plugins {
    amazon = {
      version = ">= 0.0.2"
      source  = "github.com/hashicorp/amazon"
    }
  }
}

source "amazon-ebs" "frontend-example" {
  ami_name      = "frontend-example"
  instance_type = "t2.micro"
  region        = "eu-west-2"
  source_ami_filter {
    filters = {
      name                = "ubuntu/images/*ubuntu-xenial-16.04-amd64-server-*"
      root-device-type    = "ebs"
      virtualization-type = "hvm"
    }
    most_recent = true
    owners      = ["099720109477"]
  }
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

  provisioner "file" {
      source = "./index.html"
      destination = "/var/www"
  }

  provisioner "file" {
      source = "./public"
      destination = "/var/www/public"
  }

  provisioner "file" {
      source = "./src"
      destination = "/var/www/src"
  }

  provisioner "file" {
      source = "./config-server.sh"
      destination = "/etc"
  }

  provisioner "remote-exec" {
      inline = [
        "chmod +x /etc/config-server.sh",
        "sudo /etc/config-server.sh",
      ]
  }
}

