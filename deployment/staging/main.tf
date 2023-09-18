terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = "eu-west-2"
}

resource "aws_default_vpc" "default" {
  tags = {
    Name = "Default VPC"
  }
}

resource "aws_default_subnet" "default_az1" {
  availability_zone = "eu-west-2b"

  tags = {
    Name = "Default subnet for eu-west-2b"
  }
}

resource "aws_security_group" "allow_ssh" {
  name   = "allow_ssh"
  vpc_id = aws_default_vpc.default.id
}

resource "aws_security_group_rule" "ingress_ssh" {
  type              = "ingress"
  security_group_id = aws_security_group.allow_ssh.id

  from_port   = "22"
  to_port     = "22"
  protocol    = "tcp"
  cidr_blocks = ["0.0.0.0/0"]
}

resource "aws_security_group_rule" "ingress_http" {
  type              = "ingress"
  security_group_id = aws_security_group.allow_ssh.id

  from_port   = "80"
  to_port     = "80"
  protocol    = "tcp"
  cidr_blocks = ["0.0.0.0/0"]
}


resource "aws_security_group_rule" "egress_all_ports" {
  type              = "egress"
  security_group_id = aws_security_group.allow_ssh.id

  from_port   = 0
  to_port     = 0
  protocol    = "-1"
  cidr_blocks = ["0.0.0.0/0"]
}

data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"] # Canonical
}

resource "aws_key_pair" "ssh-key" {
  key_name   = "ssh-key"
  public_key = file("../.ssh/id_rsa.pub")
}

resource "aws_instance" "web" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t2.micro"

  subnet_id = aws_default_subnet.default_az1.id

  vpc_security_group_ids = [aws_security_group.allow_ssh.id]

  key_name = aws_key_pair.ssh-key.key_name

  tags = {
    Name = "HelloWorld"
  }
}

resource "terraform_data" "provision_server" {
  connection {
    type = "ssh"
    port = "22"

    host = aws_instance.web.public_ip
    user = "ubuntu"

    private_key = file("../.ssh/id_rsa")

    timeout = "2m"
  }

  provisioner "remote-exec" {
    inline = [
      "mkdir /home/ubuntu/www",
      "mkdir /home/ubuntu/www/public",
      "mkdir /home/ubuntu/www/src"
    ]
  }

  provisioner "file" {
    source      = "../../app/index.html"
    destination = "/home/ubuntu/www/index.html"
  }

  provisioner "file" {
    source      = "../../app/public/"
    destination = "/home/ubuntu/www/public/"
  }

  provisioner "file" {
    source      = "../../app/src/"
    destination = "/home/ubuntu/www/src/"
  }

  provisioner "remote-exec" {
    script = "../provision_scripts/config_server.sh"
  }

  provisioner "remote-exec" {
    script = "../provision_scripts/position_files.sh"
  }

  provisioner "remote-exec" {
    inline = [
      "sudo nohup busybox httpd -f -p 8080 &"
    ]
  }
}
