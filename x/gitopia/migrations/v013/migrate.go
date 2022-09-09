package v013

import (
	gitopiatypesv012 "github.com/gitopia/gitopia/x/gitopia/migrations/v012"
)

func migrateGitopiaGenesisTov013(gitopiaGenesisv012 gitopiatypesv012.GenesisState, gitopiaGenesis *GenesisState) {
	for i := range gitopiaGenesisv012.UserList {
		var repositories []*UserRepository
		var organizations []*UserOrganization

		for _, v012 := range gitopiaGenesisv012.UserList[i].Repositories {
			repositories = append(repositories,
				&UserRepository{
					Name: v012.Name,
					Id:   v012.Id,
				},
			)
		}

		for _, v012 := range gitopiaGenesisv012.UserList[i].Organizations {
			organizations = append(organizations,
				&UserOrganization{
					Name: v012.Name,
					Id:   v012.Id,
				},
			)
		}

		gitopiaGenesis.UserList = append(gitopiaGenesis.UserList,
			User{
				Creator:        gitopiaGenesisv012.UserList[i].Creator,
				Id:             gitopiaGenesisv012.UserList[i].Id,
				Name:           gitopiaGenesisv012.UserList[i].Name,
				Username:       gitopiaGenesisv012.UserList[i].Username,
				UsernameGithub: gitopiaGenesisv012.UserList[i].UsernameGithub,
				AvatarUrl:      gitopiaGenesisv012.UserList[i].AvatarUrl,
				Followers:      gitopiaGenesisv012.UserList[i].Followers,
				Following:      gitopiaGenesisv012.UserList[i].Following,
				Repositories:   repositories,
				Organizations:  organizations,
				StarredRepos:   gitopiaGenesisv012.UserList[i].StarredRepos,
				Subscriptions:  gitopiaGenesisv012.UserList[i].Subscriptions,
				Bio:            gitopiaGenesisv012.UserList[i].Bio,
				CreatedAt:      gitopiaGenesisv012.UserList[i].CreatedAt,
				UpdatedAt:      gitopiaGenesisv012.UserList[i].UpdatedAt,
			},
		)
	}

	for i := range gitopiaGenesisv012.OrganizationList {
		var repositories []*OrganizationRepository
		var members []*OrganizationMember

		for _, v012 := range gitopiaGenesisv012.OrganizationList[i].Repositories {
			repositories = append(repositories,
				&OrganizationRepository{
					Name: v012.Name,
					Id:   v012.Id,
				},
			)
		}

		for _, v012 := range gitopiaGenesisv012.OrganizationList[i].Members {
			members = append(members,
				&OrganizationMember{
					Id:   v012.Id,
					Role: OrganizationMember_Role(v012.Role),
				},
			)
		}

		gitopiaGenesis.OrganizationList = append(gitopiaGenesis.OrganizationList,
			Organization{
				Creator:      gitopiaGenesisv012.OrganizationList[i].Creator,
				Id:           gitopiaGenesisv012.OrganizationList[i].Id,
				Address:      gitopiaGenesisv012.OrganizationList[i].Address,
				Name:         gitopiaGenesisv012.OrganizationList[i].Name,
				AvatarUrl:    gitopiaGenesisv012.OrganizationList[i].AvatarUrl,
				Followers:    gitopiaGenesisv012.OrganizationList[i].Followers,
				Following:    gitopiaGenesisv012.OrganizationList[i].Following,
				Repositories: repositories,
				Teams:        gitopiaGenesisv012.OrganizationList[i].Teams,
				Members:      members,
				Location:     gitopiaGenesisv012.OrganizationList[i].Location,
				Website:      gitopiaGenesisv012.OrganizationList[i].Website,
				Verified:     gitopiaGenesisv012.OrganizationList[i].Verified,
				Description:  gitopiaGenesisv012.OrganizationList[i].Description,
				CreatedAt:    gitopiaGenesisv012.OrganizationList[i].CreatedAt,
				UpdatedAt:    gitopiaGenesisv012.OrganizationList[i].UpdatedAt,
			},
		)
	}

	for i := range gitopiaGenesisv012.RepositoryList {
		var branches []*RepositoryBranch
		var tags []*RepositoryTag
		var issues []*RepositoryIssue
		var pullRequests []*RepositoryPullRequest
		var labels []*RepositoryLabel
		var releases []*RepositoryRelease
		var collaborators []*RepositoryCollaborator

		for _, v012 := range gitopiaGenesisv012.RepositoryList[i].Branches {
			branches = append(branches,
				&RepositoryBranch{
					Name:          v012.Name,
					Sha:           v012.Sha,
					LastUpdatedAt: v012.LastUpdatedAt,
				},
			)
		}

		for _, v012 := range gitopiaGenesisv012.RepositoryList[i].Tags {
			tags = append(tags,
				&RepositoryTag{
					Name:          v012.Name,
					Sha:           v012.Sha,
					LastUpdatedAt: v012.LastUpdatedAt,
				},
			)
		}

		for _, v012 := range gitopiaGenesisv012.RepositoryList[i].Issues {
			issues = append(issues,
				&RepositoryIssue{
					Iid: v012.Iid,
					Id:  v012.Id,
				},
			)
		}

		for _, v012 := range gitopiaGenesisv012.RepositoryList[i].PullRequests {
			pullRequests = append(pullRequests,
				&RepositoryPullRequest{
					Iid: v012.Iid,
					Id:  v012.Id,
				},
			)
		}

		for _, v012 := range gitopiaGenesisv012.RepositoryList[i].Labels {
			labels = append(labels,
				&RepositoryLabel{
					Id:          v012.Id,
					Name:        v012.Name,
					Color:       v012.Color,
					Description: v012.Description,
				},
			)
		}

		for _, v012 := range gitopiaGenesisv012.RepositoryList[i].Releases {
			releases = append(releases,
				&RepositoryRelease{
					Id:      v012.Id,
					TagName: v012.TagName,
				},
			)
		}

		for _, v012 := range gitopiaGenesisv012.RepositoryList[i].Collaborators {
			collaborators = append(collaborators,
				&RepositoryCollaborator{
					Id:         v012.Id,
					Permission: RepositoryCollaborator_Permission(v012.Permission),
				},
			)
		}

		gitopiaGenesis.RepositoryList = append(gitopiaGenesis.RepositoryList,
			Repository{
				Creator: gitopiaGenesisv012.RepositoryList[i].Creator,
				Id:      gitopiaGenesisv012.RepositoryList[i].Id,
				Name:    gitopiaGenesisv012.RepositoryList[i].Name,
				Owner: &RepositoryOwner{
					Id:   gitopiaGenesisv012.RepositoryList[i].Owner.Id,
					Type: RepositoryOwner_Type(gitopiaGenesisv012.RepositoryList[i].Owner.Type),
				},
				Description:   gitopiaGenesisv012.RepositoryList[i].Description,
				Forks:         gitopiaGenesisv012.RepositoryList[i].Forks,
				Branches:      branches,
				Tags:          tags,
				Subscribers:   gitopiaGenesisv012.RepositoryList[i].Subscribers,
				Commits:       gitopiaGenesisv012.RepositoryList[i].Commits,
				Issues:        issues,
				PullRequests:  pullRequests,
				IssuesCount:   gitopiaGenesisv012.RepositoryList[i].IssuesCount,
				PullsCount:    gitopiaGenesisv012.RepositoryList[i].PullsCount,
				Labels:        labels,
				LabelsCount:   gitopiaGenesisv012.RepositoryList[i].LabelsCount,
				Releases:      releases,
				CreatedAt:     gitopiaGenesisv012.RepositoryList[i].CreatedAt,
				UpdatedAt:     gitopiaGenesisv012.RepositoryList[i].UpdatedAt,
				PushedAt:      gitopiaGenesisv012.RepositoryList[i].PushedAt,
				Stargazers:    gitopiaGenesisv012.RepositoryList[i].Stargazers,
				Archived:      gitopiaGenesisv012.RepositoryList[i].Archived,
				License:       gitopiaGenesisv012.RepositoryList[i].License,
				DefaultBranch: gitopiaGenesisv012.RepositoryList[i].DefaultBranch,
				Parent:        gitopiaGenesisv012.RepositoryList[i].Parent,
				Fork:          gitopiaGenesisv012.RepositoryList[i].Fork,
				Collaborators: collaborators,
				AllowForking:  gitopiaGenesisv012.RepositoryList[i].AllowForking,
			},
		)
	}

	for i := range gitopiaGenesisv012.IssueList {
		gitopiaGenesis.IssueList = append(gitopiaGenesis.IssueList,
			Issue{
				Creator:       gitopiaGenesisv012.IssueList[i].Creator,
				Id:            gitopiaGenesisv012.IssueList[i].Id,
				Iid:           gitopiaGenesisv012.IssueList[i].Iid,
				Title:         gitopiaGenesisv012.IssueList[i].Title,
				State:         Issue_State(gitopiaGenesisv012.IssueList[i].State),
				Description:   gitopiaGenesisv012.IssueList[i].Description,
				Comments:      gitopiaGenesisv012.IssueList[i].Comments,
				CommentsCount: gitopiaGenesisv012.IssueList[i].CommentsCount,
				PullRequests:  gitopiaGenesisv012.IssueList[i].PullRequests,
				RepositoryId:  gitopiaGenesisv012.IssueList[i].RepositoryId,
				Labels:        gitopiaGenesisv012.IssueList[i].Labels,
				Weight:        gitopiaGenesisv012.IssueList[i].Weight,
				Assignees:     gitopiaGenesisv012.IssueList[i].Assignees,
				CreatedAt:     gitopiaGenesisv012.IssueList[i].CreatedAt,
				UpdatedAt:     gitopiaGenesisv012.IssueList[i].UpdatedAt,
				ClosedAt:      gitopiaGenesisv012.IssueList[i].ClosedAt,
				ClosedBy:      gitopiaGenesisv012.IssueList[i].ClosedBy,
			},
		)
	}

	for i := range gitopiaGenesisv012.PullRequestList {
		gitopiaGenesis.PullRequestList = append(gitopiaGenesis.PullRequestList,
			PullRequest{
				Creator:             gitopiaGenesisv012.PullRequestList[i].Creator,
				Id:                  gitopiaGenesisv012.PullRequestList[i].Id,
				Iid:                 gitopiaGenesisv012.PullRequestList[i].Iid,
				Title:               gitopiaGenesisv012.PullRequestList[i].Title,
				State:               PullRequest_State(gitopiaGenesisv012.PullRequestList[i].State),
				Description:         gitopiaGenesisv012.PullRequestList[i].Description,
				Locked:              gitopiaGenesisv012.PullRequestList[i].Locked,
				Comments:            gitopiaGenesisv012.PullRequestList[i].Comments,
				CommentsCount:       gitopiaGenesisv012.PullRequestList[i].CommentsCount,
				Issues:              gitopiaGenesisv012.PullRequestList[i].Issues,
				Labels:              gitopiaGenesisv012.PullRequestList[i].Labels,
				Assignees:           gitopiaGenesisv012.PullRequestList[i].Assignees,
				Reviewers:           gitopiaGenesisv012.PullRequestList[i].Reviewers,
				Draft:               gitopiaGenesisv012.PullRequestList[i].Draft,
				CreatedAt:           gitopiaGenesisv012.PullRequestList[i].CreatedAt,
				UpdatedAt:           gitopiaGenesisv012.PullRequestList[i].UpdatedAt,
				ClosedAt:            gitopiaGenesisv012.PullRequestList[i].ClosedAt,
				ClosedBy:            gitopiaGenesisv012.PullRequestList[i].ClosedBy,
				MergedAt:            gitopiaGenesisv012.PullRequestList[i].MergedAt,
				MergedBy:            gitopiaGenesisv012.PullRequestList[i].MergedBy,
				MergeCommitSha:      gitopiaGenesisv012.PullRequestList[i].MergeCommitSha,
				MaintainerCanModify: gitopiaGenesisv012.PullRequestList[i].MaintainerCanModify,
				Head: &PullRequestHead{
					RepositoryId: gitopiaGenesisv012.PullRequestList[i].Head.RepositoryId,
					Branch:       gitopiaGenesisv012.PullRequestList[i].Head.Branch,
					CommitSha:    gitopiaGenesisv012.PullRequestList[i].Head.CommitSha,
				},
				Base: &PullRequestBase{
					RepositoryId: gitopiaGenesisv012.PullRequestList[i].Base.RepositoryId,
					Branch:       gitopiaGenesisv012.PullRequestList[i].Base.Branch,
					CommitSha:    gitopiaGenesisv012.PullRequestList[i].Base.CommitSha,
				},
			},
		)
	}

	for i := range gitopiaGenesisv012.CommentList {
		gitopiaGenesis.CommentList = append(gitopiaGenesis.CommentList,
			Comment{
				Creator:           gitopiaGenesisv012.CommentList[i].Creator,
				Id:                gitopiaGenesisv012.CommentList[i].Id,
				ParentId:          gitopiaGenesisv012.CommentList[i].ParentId,
				CommentIid:        gitopiaGenesisv012.CommentList[i].CommentIid,
				Body:              gitopiaGenesisv012.CommentList[i].Body,
				Attachments:       gitopiaGenesisv012.CommentList[i].Attachments,
				DiffHunk:          gitopiaGenesisv012.CommentList[i].DiffHunk,
				Path:              gitopiaGenesisv012.CommentList[i].Path,
				System:            gitopiaGenesisv012.CommentList[i].System,
				AuthorAssociation: gitopiaGenesisv012.CommentList[i].AuthorAssociation,
				CreatedAt:         gitopiaGenesisv012.CommentList[i].CreatedAt,
				UpdatedAt:         gitopiaGenesisv012.CommentList[i].UpdatedAt,
				CommentType:       Comment_Type(gitopiaGenesisv012.CommentList[i].CommentType),
			},
		)
	}

	for i := range gitopiaGenesisv012.ReleaseList {
		var attachments []*Attachment

		for _, v012 := range gitopiaGenesisv012.ReleaseList[i].Attachments {
			attachments = append(attachments,
				&Attachment{
					Name:     v012.Name,
					Size_:    v012.Size_,
					Sha:      v012.Sha,
					Uploader: v012.Uploader,
				},
			)
		}

		gitopiaGenesis.ReleaseList = append(gitopiaGenesis.ReleaseList,
			Release{
				Creator:      gitopiaGenesisv012.ReleaseList[i].Creator,
				Id:           gitopiaGenesisv012.ReleaseList[i].Id,
				RepositoryId: gitopiaGenesisv012.ReleaseList[i].RepositoryId,
				TagName:      gitopiaGenesisv012.ReleaseList[i].TagName,
				Target:       gitopiaGenesisv012.ReleaseList[i].Target,
				Name:         gitopiaGenesisv012.ReleaseList[i].Name,
				Description:  gitopiaGenesisv012.ReleaseList[i].Description,
				Attachments:  attachments,
				Draft:        gitopiaGenesisv012.ReleaseList[i].Draft,
				PreRelease:   gitopiaGenesisv012.ReleaseList[i].PreRelease,
				IsTag:        gitopiaGenesisv012.ReleaseList[i].IsTag,
				CreatedAt:    gitopiaGenesisv012.ReleaseList[i].CreatedAt,
				UpdatedAt:    gitopiaGenesisv012.ReleaseList[i].UpdatedAt,
				PublishedAt:  gitopiaGenesisv012.ReleaseList[i].PublishedAt,
			},
		)
	}

	for i := range gitopiaGenesisv012.WhoisList {
		gitopiaGenesis.WhoisList = append(gitopiaGenesis.WhoisList,
			Whois{
				Creator: gitopiaGenesisv012.WhoisList[i].Creator,
				Name:    gitopiaGenesisv012.WhoisList[i].Name,
				Address: gitopiaGenesisv012.WhoisList[i].Address,
			},
		)
	}

	gitopiaGenesis.ReleaseCount = gitopiaGenesisv012.ReleaseCount
	gitopiaGenesis.PullRequestCount = gitopiaGenesisv012.PullRequestCount
	gitopiaGenesis.OrganizationCount = gitopiaGenesisv012.OrganizationCount
	gitopiaGenesis.CommentCount = gitopiaGenesisv012.CommentCount
	gitopiaGenesis.IssueCount = gitopiaGenesisv012.IssueCount
	gitopiaGenesis.RepositoryCount = gitopiaGenesisv012.RepositoryCount
	gitopiaGenesis.UserCount = gitopiaGenesisv012.UserCount
	gitopiaGenesis.WhoisCount = gitopiaGenesisv012.WhoisCount
}
