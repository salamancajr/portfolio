const expect = require("expect");
const request = require("supertest");
const {app} = require("./../server");
const {Blog} = require("./../models/blog");
const {Entry} = require("./../models/entry");
const {entries, populateEntries, users, populateUsers, blogs, populateBlogs} = require("./seed/seed");

beforeEach(populateEntries);
beforeEach(populateUsers);
beforeEach(populateBlogs);

///////////////////////////PROJECTS/////////////////////////////

describe("GET /api", ()=>{
    it("should get all project entries", (done)=>{
        request(app)
        .get("/api")
        .expect(200)
        .expect((res)=>{
            expect(res.body.length).toBe(2)
        })
        .end(done);
    })
});

describe(`GET /api/:id`, ()=>{
    it("should fetch desired project", (done)=>{
        request(app)
        .get(`/api/${entries[0].title}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.description).toBe(entries[0].description)
        })
        .end(done)
    })
})

describe("POST /api", ()=>{
    it("should create a new project entry", (done)=>{
        request(app)
        .post("/api")
        .set("x-auth", users[0].tokens[0].token)
        .field({
            title:"hello",
            description:"test",
            link:"test",
            githubLink:"ok"
        })
        .attach("avatar", "./blogUploads/2018-07-19T03-03-30.498Ztestimage2.jpeg")
        .expect(200)
        .expect((res)=>{
            expect(res.body.title).toBe("hello")
            expect(res.body.img.contentType).toBe("image/png")
        })
        .end(done)
    })
})

describe(`PATCH /api`, ()=>{
    it("should edit an existing project entry", (done)=>{
        request(app)
        .patch(`/api/${entries[0]._id}`)
        .set("x-auth", users[0].tokens[0].token)
        .send({"title":"hey baby"})
        .expect(200)
        .end(done)
        .expect((res)=>{
            Entry.findById(entries[0]._id).then((data)=>{
                expect(data.title).toBe("hey baby")
            })
        })

    })
})

describe("DELETE /api", ()=>{
    it("should delete a project entry", (done)=>{
        request(app)
        .delete(`/api/${entries[0]._id}`)
        .set("x-auth", users[0].tokens[0].token)
        .expect(200)
        .expect((res)=>{
            Entry.findById(entries[0]._id).then((data)=>{
                expect(data).toBe(null)
            })
        })
        .end(done)
    })
})

////////////////////BLOGS///////////////////////////////////
describe("GET /blog", ()=>{
    it("should get all blogs", (done)=>{
        request(app)
        .get("/blog")
        .expect(200)
        .expect((res)=>{
            expect(res.body.length).toBe(2)
            expect(res.body[0].title).toBe("Test blog")
        })
        .end(done)
    })
})

describe("GET /blog/:id", ()=>{
    it("should return a specific blog", (done)=>{
        request(app)
        .get(`/blog/${blogs[0]._id}`)
        .expect(200)
        .expect((res)=>{
            res.body._id
        })
        .end(done)
    })
})

