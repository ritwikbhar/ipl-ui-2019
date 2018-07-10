import { Component, OnInit } from '@angular/core';
import { PostsService as PostsApi, Post } from '../../api';
import { UserService } from '../../user/user.service';
import { InternalizedPost, InternalizedComment } from '../model/post';

@Component({
  selector: 'app-discussion-main',
  templateUrl: './discussion-main.component.html',
  styleUrls: ['./discussion-main.component.scss']
})
export class DiscussionMainComponent implements OnInit {

  postText : string;
  prevPosts : InternalizedPost[] = [];

  private apiKey : string;
  private userId : string;
  private userdisplayName : string;
  

  constructor(private postApi : PostsApi, private userService : UserService) { }

  ngOnInit() {
    this.userService.getLoginObserver().subscribe(loginResponse => {
      this.apiKey = loginResponse.apiKey;
      this.userId = loginResponse.userId;
      this.userService.getUser(this.userId).then(user => {
        this.userdisplayName = user.displayName;
      });
    });
    this.postApi.getPosts().subscribe(posts => {
      posts.forEach(post => {
        this.userService.getUser(post.userId).then(user => {
          this.prevPosts.push({
            dateTime: new Date(post.dateTime).toLocaleString(),
            id: post.id,
            image: null,
            text: post.text,
            userDisplayName: user.displayName,
            userId: user.id,
            comments: []
          });
          this.prevPosts.sort((post1, post2) => Date.parse(post2.dateTime) - Date.parse(post1.dateTime));
        });
      });
    });
  }


  createPost(){
    let post : Post = {
      text: this.postText,
      userId: this.userId
    }
    this.postApi.createNewPost(post, this.apiKey).subscribe(post => {
      let internalizedPost : InternalizedPost = {
        dateTime: new Date(post.dateTime).toLocaleString(),
        id: post.id,
        image: null,
        text: post.text,
        userDisplayName: this.userdisplayName,
        userId: this.userId,
        comments: []
      };
      this.prevPosts = [internalizedPost].concat(this.prevPosts);
      this.postText = "";
    });
  }

  postComment(postId : string) {
    let post = this.prevPosts.find(post => post.id === postId);
    this.postApi.addComment(post.id, {
      postId: post.id,
      text: post.currentComment,
      userId: this.userId
    }, this.apiKey).subscribe(comment => {
      let internalizedComment : InternalizedComment = {
        id: comment.id,
        dateTime:  new Date(comment.dateTime).toLocaleString(),
        postId: comment.postId,
        text: comment.text,
        userDisplayName: this.userdisplayName,
        userId: comment.userId
      };
      post.comments = [internalizedComment].concat(post.comments);
      post.currentComment = "";
    });
  }

  getComments(postId : string) {
    let post = this.prevPosts.find(post => post.id === postId);
    this.postApi.getComments(postId).subscribe(comments => {
      post.comments = [];
      comments.forEach(comment => {
        this.userService.getUser(comment.userId).then(user => {
          let internalizedComment : InternalizedComment = {
            id: comment.id,
            dateTime: new Date(comment.dateTime).toLocaleString(),
            postId: comment.postId,
            text: comment.text,
            userDisplayName: user.displayName,
            userId: comment.userId
          };
          post.comments.push(internalizedComment);
        });        
      });      
    });
  }
}
