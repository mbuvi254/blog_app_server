BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[blogs] ADD [isPublished] BIT NOT NULL CONSTRAINT [blogs_isPublished_df] DEFAULT 0;

-- CreateTable
CREATE TABLE [dbo].[comments] (
    [id] NVARCHAR(1000) NOT NULL,
    [blogId] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [comment] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [comments_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [lastUpdated] DATETIME2 NOT NULL,
    CONSTRAINT [comments_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[comments] ADD CONSTRAINT [comments_blogId_fkey] FOREIGN KEY ([blogId]) REFERENCES [dbo].[blogs]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[comments] ADD CONSTRAINT [comments_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
